import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", dueDate: "2023-10-01", priority: "High" },
    { id: 2, title: "Task 2", dueDate: "2023-10-02", priority: "Medium" },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
  };

  return (
    <div>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center space-x-4">
            <Checkbox />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-muted-foreground">{task.dueDate}</p>
            </div>
            <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
          </li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">Add Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <AddTaskForm onAddTask={addTask} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ title, dueDate, priority, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Input id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default TaskList;