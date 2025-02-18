import EditTaskForm from "./editTaskForm";

export default function EditTask() {
    return (
        <section className="col-span-10 row-span-full">
            <div className="bg-blue-70 h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">Edit New Task</h2>
                    <EditTaskForm/>
                </div>
            </div>
        </section>
    );
}
