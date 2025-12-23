import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  content,
  tags = [],
  isPinned,
  date,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between">
        <div>
          <h6 className="font-medium">{title}</h6>
          <p className="text-xs text-gray-500">
               {date ? new Date(date).toLocaleDateString() : ""}
          </p>
        </div>

        <MdOutlinePushPin
          onClick={onPinNote}
          className={`cursor-pointer ${
            isPinned ? "text-blue-500" : "text-gray-300"
          }`}
        />
      </div>

      <p className="text-sm mt-2">
        {content.length > 80 ? content.slice(0, 80) + "..." : content}
      </p>

      <div className="flex justify-between mt-3">
        <div className="text-xs text-gray-500">
          {tags.map((tag, i) => (
            <span key={i} className="mr-1">#{tag}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <MdCreate onClick={onEdit} className="cursor-pointer" />
          <MdDelete onClick={onDelete} className="cursor-pointer text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
