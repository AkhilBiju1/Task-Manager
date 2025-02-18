import { FaTasks } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import Image from "next/image";
import about from '../../public/about.png'
import Link from "next/link";



export default function Home() {

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 fixed w-full top-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">TaskPilot</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="hover:text-blue-700">Features</a>
              </li>
              <li>
                <Link replace={true} href="/login" className="hover:bg-blue-700 bg-blue-600 py-2 px-6 text-white rounded-full">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center p-10 bg-hero bg-cover bg-center bg-blue-600  text-white">
        <h2 className="text-4xl font-bold mb-4 text-white">Stay Organized, Stay Productive</h2>
        <p className="text-lg mb-6 text-white">A streamlined solution to help you stay organized and on top of your tasks, making productivity effortless every day.</p>
        <a href="#cta" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700">Get Started</a>
      </section>
      {/* about */}
      <section id="about" className="w-10/12 mx-auto flex justify-around ">
        <div className="w-2/5">
            <Image src={about} alt="about" className="w-full mx-auto"/>
        </div>
        <div className="w-2/5  my-auto p-0">
          <h1 className="text-3xl font-semibold mb-5 text-center">TaskPilot</h1>
          
          <p><b>TaskPilot</b> is a smart task management system designed to streamline your workflow and boost productivity. With intuitive features like task tracking, collaboration, and automated reminders, TaskPilot helps you stay organized and meet deadlines effortlessly. Let TaskPilot be your guide to efficient task management! 🚀</p>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="w-9/12 mx-auto py-16 px-6">
        <h3 className="text-3xl font-semibold text-center mb-10">Our Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <FaTasks className="text-4xl mx-auto my-4"/>
            <h4 className="text-xl font-semibold">Task Scheduling</h4>
            <p className="mt-2">Plan and prioritize your tasks with ease.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <IoIosNotifications className="text-4xl mx-auto my-4" />
            <h4 className="text-xl font-semibold">Reminders & Notifications</h4>
            <p className="mt-2">Never miss a deadline with smart reminders.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg text-center">
            <FaBarsProgress className="text-4xl mx-auto my-4" />
            <h4 className="text-xl font-semibold">Progress Tracking</h4>
            <p className="mt-2">Monitor your progress and stay motivated.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-blue-700 text-white text-center py-16 px-6">
        <h3 className="text-3xl font-semibold mb-4">Boost Your Productivity Today</h3>
        <p className="mb-6">Sign up now and take control of your tasks.</p>
        <Link replace={true} href="/signup" className="bg-white text-blue-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">Sign Up</Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6">
        <p>&copy; 2025 TaskPilot. All rights reserved.</p>
      </footer>
    </div>

  );
}
