import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import EmptyCard from "../components/EmptyCard";
import empty from "../assets/empty.jpeg";
import nosearch from "../assets/nosearch.png";
import API from "../Services/api"; 

Modal.setAppElement("#root");

const Dashboard = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setAllNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const updateIsPinned = async (id) => {
    try {
      await API.patch(`/notes/pin/${id}`);
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes(); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const filteredNotes = allNotes.filter((note) => {
    if (!searchQuery) return true;
    return (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
<Navbar
  userInfo={{ name: "Kiran" }}
  onSearchChange={(val) => {
    setSearchQuery(val);
    setIsSearch(!!val);
  }}
  onLogout={() => {
    console.log("Logout clicked");
    localStorage.removeItem("token");
    window.location.reload();
  }}
/>

      <div className="container mx-auto px-6 py-8">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {[...filteredNotes]
              .sort((a, b) => b.isPinned - a.isPinned)
              .map((item) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdAt}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item._id)}
                  onPinNote={() => updateIsPinned(item._id)}
                />
              ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? nosearch : empty}
            message={
              isSearch
                ? "Oops! No notes found matching your search."
                : "Start creating your first note! Click the 'Add' button to note down your thoughts and ideas."
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10 shadow-lg transition-all"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        className="w-[90%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 shadow-2xl overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          setAllNotes={setAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
