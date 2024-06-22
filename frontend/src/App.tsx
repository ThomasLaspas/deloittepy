/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Button } from './@/components/ui/button';
import IsAuth from './@/utils/authorized';
import { useEffect, useState } from 'react';
import { getTax } from './apis/axios';
import Aiadvice from './@/components/Aiadvice';
import { DialogDemo } from './@/components/DialogTax';
import CreateForm from './@/components/CreateForm';
function App() {
  const isAuthorized = IsAuth();
  const [user, setuser] = useState<any>(false)
  const [load, setload] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthorized) {
      fetchTaxes();
    }
  }, [isAuthorized]);

  const fetchTaxes = async () => {
    setload(true)
    try {
      const data = await getTax();
      setuser(data);
    } catch (error) {
      console.error('Error fetching taxes:', error);
    } finally {
      setload(false)
    }
  };
  console.log(user)
  if (load) {
    return (
      <h1>loading...</h1>
    )
  }
  if (!isAuthorized) {
    return (
      <div className="h-[80vh] grid place-items-center w-full sm:px-[4%] px-[6%] ">
        <div className="flex flex-col gap-5">
          <h1 className="sm:text-3xl lg:text-4xl text-lg">Login first to use our Ai feature</h1>
          <Button className="w-full cursor-pointer"><Link to="/signin-up" className="cursor-pointer">Sign-in</Link></Button>
        </div>
      </div>)
  }
  return (
    <div className="flex flex-col items-center h-full sm:px-[4%] px-[6%]  pt-3 w-full ">


      {user.add_taxes ? <div className="flex flex-col gap-7 mt-4">
        <h1 className="sm:text-3xl lg:text-4xl text-lg text-center">We take your info, click the button bellow to generate our most efficient tax advice and get money back. Or if you think your info isnt correct you can edit.</h1>
        <div className="flex items-center justify-center "> <DialogDemo /> </div>
        <div className="flex items-center justify-center "> <Aiadvice /></div>


      </div> : <><h1 className="sm:text-3xl lg:text-4xl text-lg text-center mt-5">Fill the form bellow with your personal info, to help us give you better tax advice</h1><div className="border-2 rounded-xl border-primary p-5 text-center lg:w-1/2 sm:w-4/6  w-full mt-[5%]"><CreateForm /></div></>}</div>
  );

}

export default App
