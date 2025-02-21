import AddTaskForm from "./addTaskForm";

export default function AddTask() {
    return (
        <section className="col-span-full mt-2 md:mt-0 lg:col-span-10 md:col-span-9 lg:row-span-full">
            <div className="bg-blue-50 h-screen flex items-center justify-center p-4">
                <div className="w-full lg:w-3/5  md:w-4/5 bg-white shadow-lg rounded-xl p-6 mt-2">
                    <h2 className="text-2xl font-semibold text-center mb-6">Add New Task</h2>
                    <AddTaskForm/>
                </div>
            </div>
        </section>
    );
}
