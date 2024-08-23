
import {useState, useEffect} from "react"
import axios from "axios"

type TStatus = "idle" | "checking" | "available" |  "notAvailable" | "faild"

const useCheckEmailAvailability = () => {
  // email status state ...
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle")
  
  // Is Email enterd ...
  const [enteredEmail, setEnteredEmail] = useState<null|string>(null);
  
 // checking email is Availability...
  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    
    
    try {
      const response = await axios.get(`/users?email=${email}`);
      
      if (!response.data.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("notAvailable");
      }
      
    }
    catch {
      setEmailAvailabilityStatus("faild")
    }
    
  };
  
  // Reset Checking For Email...
  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  }
 
 
 return {
   emailAvailabilityStatus, 
   enteredEmail,
   checkEmailAvailability,
   resetCheckEmailAvailability
 }
 
}

export default useCheckEmailAvailability;