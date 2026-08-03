import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  name: "",
  rollNumber: "",
  email: "",
  phone: "",
  department: "",
  year: 1,
  gender: "Male",
  address: "",
};

const AVATAR_COLORS = ["from-cyan-400 to-blue-500", "from-fuchsia-400 to-pink-500", "from-amber-400 to-orange-500", "from-emerald-400 to-teal-500", "from-indigo-400 to-violet-500"];

const getInitials = (name = "") => name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

const Students = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const { data } = await api.get("/students", { params: { search, department } });
      setStudents(data);
    } catch (err) {
      setError("Failed to load students");
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchStudents, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department]);

  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setForm(student);
    setEditingId(student._id);
    setShowModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/students/${editingId}`, form);
      } else {
        await api.post("/students", form);
      }
      setShowModal(false);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record?")) return;
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const handleExportExcel = () => {
    if (students.length === 0) {
      alert("No student data to export!");
      return;
    }
    const exportData = students.map((s) => ({
      "Roll Number": s.rollNumber,
      "Name": s.name,
      "Email": s.email,
      "Phone": s.phone || "-",
      "Department": s.department,
      "Year": s.year,
      "Gender": s.gender || "-",
      "Address": s.address || "-",
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    worksheet["!cols"] = [{ wch: 14 }, { wch: 20 }, { wch: 25 }, { wch: 14 }, { wch: 20 }, { wch: 8 }, { wch: 10 }, { wch: 25 }];
    const dateStr = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Student_List_${dateStr}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />

      <div className="fixed top-20 right-10 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative py-8 px-6 mb-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-black">👥 Students</h1>
            <p className="text-gray-400 text-sm mt-1">{students.length} record(s) found</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportExcel}
              className="bg-white/5 border border-white/20 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-white/10 transition"
            >
              📥 Export to Excel
            </button>
            {isAdmin && (
              <button
                onClick={openAddModal}
                className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 text-gray-900 px-5 py-2.5 rounded-full font-bold hover:opacity-90 transition shadow-lg"
              >
                + Add Student
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative px-6 max-w-6xl mx-auto pb-10">
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            placeholder="🔍 Search by name, roll no, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/20 shadow-sm rounded-full px-4 py-2.5 flex-1 min-w-[220px] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            placeholder="🏫 Filter by department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-white/5 border border-white/20 shadow-sm rounded-full px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {students.length === 0 ? (
          <div className="text-center mt-16 rounded-2xl bg-white/5 border border-white/10 p-10">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-gray-400 font-medium">No students found. {isAdmin && "Add your first student!"}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((s, index) => (
              <div
                key={s._id}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:-translate-y-1 transition duration-300 p-5 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-gray-900 font-bold shadow`}>
                    {getInitials(s.name)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{s.name}</p>
                    <p className="text-xs text-gray-500">Roll No: {s.rollNumber}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>🏫 {s.department} • Year {s.year}</p>
                  <p>✉️ {s.email}</p>
                  {s.phone && <p>📞 {s.phone}</p>}
                </div>
                {isAdmin && (
                  <div className="flex gap-3 mt-4 pt-3 border-t border-white/10">
                    <button onClick={() => openEditModal(s)} className="text-cyan-400 text-sm font-medium hover:underline">✏️ Edit</button>
                    <button onClick={() => handleDelete(s._id)} className="text-red-400 text-sm font-medium hover:underline">🗑️ Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg p-6 text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              {editingId ? "✏️ Edit Student" : "➕ Add Student"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Name" required value={form.name} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 col-span-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <input name="rollNumber" placeholder="Roll Number" required value={form.rollNumber} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <input name="email" type="email" placeholder="Email" required value={form.email} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <input name="department" placeholder="Department" required value={form.department} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <input name="year" type="number" min="1" max="5" placeholder="Year" required value={form.year} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />
              <select name="gender" value={form.gender} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none">
                <option className="text-black">Male</option>
                <option className="text-black">Female</option>
                <option className="text-black">Other</option>
              </select>
              <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 col-span-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none" />

              <div className="col-span-2 flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 text-gray-900 font-bold hover:opacity-90">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;