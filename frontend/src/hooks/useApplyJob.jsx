import axios from "axios";
import { useEffect, useState } from "react";
import { APPLICATION_API_ENDPOINT} from "../components/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingalJob } from "../redux/jobSlice";
import { toast } from "sonner";

const useApplyJob = (jobId) => {
  
  const dispatch = useDispatch();
  const { singalJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  

  const [isAppliedd, setIsAppliedd] = useState(false);
  const [isApplying, setIsApplying] = useState(false);


  useEffect(() => {
  if (singalJob && user) {
    const applied = singalJob.application?.some(
      app => app.applicant === user._id || app.applicant?._id === user._id
    );
    setIsAppliedd(applied || false);
  }
}, [singalJob, user]);


  const applyJob = async () => {
    if (isApplying) return;

    try {
      setIsApplying(true);

      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsAppliedd(true);
        dispatch(
          setSingalJob({
            ...singalJob,
            application: [
              ...singalJob.application,
              { applicant: user?._id }
            ],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsApplying(false);
    }
  };

  return { applyJob, isApplying, isAppliedd };
};

export default useApplyJob;