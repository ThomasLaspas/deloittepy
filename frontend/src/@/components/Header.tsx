import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from './ui/button';
type HeaderProps = {
    auth: boolean | null; // Allow for `null` since `IsAuth` can return `null`
};
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { REFRESH_TOKEN, ACCESS_TOKEN, USERNAME } from '../utils/constants';

function Header({ auth }: HeaderProps) {
    const logOut = async () => {
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(USERNAME);
        window.location.href = '/'

    }

    return (
        <div className='w-full py-6 sm:px-[4%] px-[6%] flex items-center justify-between border-b-2 border-primary '>
            <section className='flex items-center'>
                <Link to='/' className='text-decoration-none'><h1 className='sm:text-4xl'>AI tax advisor</h1></Link>
            </section>

            <section className='flex items-center gap-6 cursor-pointer '>
                {auth ? <DropdownMenu>
                    <DropdownMenuTrigger><Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>

                        <DropdownMenuItem><Button onClick={logOut} className='w-full'>Log-out</Button></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu> : <Link to="/signin-up">Sign-In</Link>}



            </section>


        </div>
    )
}

export default Header