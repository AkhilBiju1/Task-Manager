"use client";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import React, { ChangeEvent, useState } from "react";

interface Task {
    
    title: string;
    description: string;
    
}



const columns: ColumnDef<Task>[] = [
    
    { accessorKey: "name", header: "Project Name" },
    { accessorKey: "description", header: "Description" },
     
];

export default function ProjectTable() {
    const fetchTasks = async () => {
        try {
            const res = await axios.get("/api/projects");
            return res.data.tasks;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw { message: 'Unknown error occurred' };
            }
        }
        
    };

    const { data, isLoading, error, isSuccess ,refetch} = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks, refetchInterval: 2000 });
    

   
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,     
        },
        initialState: {
            pagination: { pageSize: 7 },
        },
        onGlobalFilterChange: setGlobalFilter,
        getPaginationRowModel: getPaginationRowModel(), 
       
    });
    if (isLoading) return (<div className="w-full h-full grid grid-rows-9 "><h1 className="row-start-5 text-md text-center items-center ">loading</h1></div>)
    if (error) return (<div>
        {error.message +'try again later'}
        <button className="text-blue-700" onClick={()=>refetch}>retry</button>
    </div>)
   if(isSuccess) return (
        <div className="h-full">
            <div className="mb-4 flex flex-row-reverse">
                <input className=" w-full md:w-3/6 lg:w-2/6 focus:outline-none border-2 rounded-lg p-2 border-blue-700"
                    placeholder="Search tasks..."
                    value={globalFilter}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
                />
            </div>
           <Table >
               <TableHeader>
                   {table.getHeaderGroups().map((headerGroup) => (
                       <TableRow key={headerGroup.id}>
                           {headerGroup.headers.map((header) => (
                               <TableHead key={header.id}>
                                   {flexRender(header.column.columnDef.header, header.getContext())}
                               </TableHead>
                           ))}
                       </TableRow>
                   ))}
               </TableHeader>
               <TableBody>
                   {table.getRowModel().rows.length > 0 ? (
                       table.getRowModel().rows.map((row) => (
                           <TableRow key={row.id}>
                               {row.getVisibleCells().map((cell) => (
                                   <TableCell key={cell.id}>
                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                   </TableCell>
                               ))}
                           </TableRow>
                       ))
                   ) : (
                       <TableRow>
                           <TableCell colSpan={columns.length} className="text-center">No Project found.</TableCell>
                       </TableRow>
                   )}
               </TableBody>
           </Table>
           <div className="flex justify-end items-center mt-4">
               

               <span>
                   Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
               </span>
               <Button
                   variant="outline"
                   size="sm"
                   onClick={() => table.previousPage()}
                   disabled={!table.getCanPreviousPage()}
               >
                   Previous
               </Button>
               <Button
                   variant="outline"
                   size="sm"
                   onClick={() => table.nextPage()}
                   disabled={!table.getCanNextPage()}
               >
                   Next
               </Button>
           </div>

        </div>
    );
}
