import { React, useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({ deletedata, get }) => {

    const { account, setAccount } = useContext(LoginContext)

    const removedata = async () => {
        if (!deletedata) {
            toast.error("Invalid item to delete", { position: "top-center" });
            return;
        }

        try {
            const res = await fetch(`/remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("error");
            } else {
                console.log("Item deleted");
                setAccount({
                    fname: data.fname || '',
                    carts: data.carts || [],
                    ...data
                });
                toast.success("Item removed successfully", {
                    position: "top-center"
                });
                get(); // refresh cart or items
            }
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Something went wrong", {
                position: "top-center"
            });
        }
    };


    return (
        <div className='add_remove_select'>
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removedata(deletedata)} > Delete</p><span></span>
            <p className='forremovemedia'>Save Or Later</p><span></span>
            <p className='forremovemedia'>See More like this</p>
            <ToastContainer />
        </div>
    )
}

export default Option
