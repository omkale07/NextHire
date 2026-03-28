import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "./utils/constant";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { ArrowRight } from "lucide-react";

const UpdateProfile = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills,
    file: user?.profile.file,
  });

  const [resumeName, setResumeName] = useState("");
  const [skillTags, setSkillTags] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      setForm({ ...form, file: file });
    }
  };

    useEffect(() => {
    if (user?.profile?.skills) {
      setSkillTags(user.profile.skills);
    }
  }, [user]);

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!skillTags.includes(skillInput.trim())) {
        setSkillTags([...skillTags, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkillTags(skillTags.filter((s) => s !== skill));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log({ ...form, skills: skillTags });

    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("email", form.email);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("bio", form.bio);
    formData.append("skills", JSON.stringify(skillTags));
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header strip */}
        <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-5">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Update Profile
          </h2>
          <p className="text-violet-200 text-sm mt-0.5">
            Keep your information up to date
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us a little about yourself..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Email & Phone — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Phone No.
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Skills{" "}
              <span className="normal-case font-normal text-gray-400">
                (press Enter or comma to add)
              </span>
            </label>
            <div className="w-full min-h-\[44px\] px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus-within:ring-2 focus-within:ring-violet-400 focus-within:border-transparent transition flex flex-wrap gap-1.5 items-center">
              {skillTags.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-violet-400 hover:text-violet-700 transition leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder={
                  skillTags.length === 0 ? "e.g. React, Node.js..." : ""
                }
                className="flex-1 min-w-\[120px\] bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Resume
            </label>
            <label className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-violet-400 hover:bg-violet-50 transition cursor-pointer group">
              <span className="text-2xl">📄</span>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm text-gray-500 group-hover:text-violet-600 transition truncate">
                  {resumeName || "Click to upload PDF or DOCX"}
                </p>
                {resumeName && (
                  <p className="text-xs text-green-500 mt-0.5">
                    ✓ File selected
                  </p>
                )}
              </div>
              <input
                id="file"
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <span>Save Changes</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
