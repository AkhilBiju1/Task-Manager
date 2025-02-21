import EditTaskForm from "./editTaskForm";

export default function EditTask() {
    return (
        <section className="col-span-full mt-3 md:mt-0 md:col-span-9 lg:col-span-10 lg:row-span-full">
            <div className="bg-blue-70 lg:h-screen flex items-center justify-center p-4">
                <div className="lg:w-3/5 md:w-4/5 bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit New Task</h2>
                    <EditTaskForm/>
                </div>
            </div>
        </section>
    );
}
