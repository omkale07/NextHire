// Profile.jsx
import React, { useState } from "react";
import AppliedJob from "./AppliedJob";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

// Pencil edit icon
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414A2 2 0 018.586 12z"
    />
  </svg>
);

const Profile = () => {

useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* ── Identity Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 ">
        {/* Blue banner */}
        <div className="relative h-32 bg-linear-to-r from-blue-600 to-blue-400">
          {/* Brand name — centered and pushed to top half only */}
          <div className="absolute top-0 left-0 right-0 h-[60%] flex items-center justify-center gap-3">
            <span className="text-white text-2xl font-bold tracking-wide drop-shadow-sm">
              NextHire
            </span>
            <span className="text-blue-100 text-sm font-medium hidden sm:block">
              — Find your next opportunity
            </span>
          </div>
        </div>

        {/* Avatar + Edit */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-14 mb-4">
            <div className="relative z-10 w-28 h-28 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-gray-200">
              {user?.profile?.profilePhoto ? (
                <img
                  src={user.profile.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-4xl">
                  {user?.fullname?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            {/* Edit icon button */}
            <button
              onClick={() => setOpen(true)}
              title="Edit Profile"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition"
            >
              <EditIcon />
              Edit
            </button>
          </div>

          {/* Name & bio */}
          <h2 className="text-xl font-bold text-gray-900">{user?.fullname}</h2>
          <p className="text-sm text-gray-500 mt-1">{user?.profile?.bio}</p>

          {/* Contact chips */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
              <MailIcon /> {user?.email}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
              <PhoneIcon /> {user?.phoneNumber}
            </span>
          </div>
        </div>
      </div>

      {/* ── Skills Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Skills</h3>
        {user?.profile?.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">NA</p>
        )}
      </div>

      {/* ── Resume Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Resume</h3>
        {isResume ? (
          <a
            target="_blank"
            href={user?.profile?.resume}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
          >
            <FileIcon /> {user?.profile?.resumeOrignal}
          </a>
        ) : (
          <p className="text-sm text-gray-400">NA</p>
        )}
      </div>

      {/* ── Applied Jobs Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Applied Jobs
        </h3>
        <AppliedJob />
      </div>

      {/* UpdateProfile modal */}
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
