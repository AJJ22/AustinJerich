import NavBar from './NavBar.js';

export default function contact(){
    return (
        <div>
            <NavBar />
            <div className="page-tailwind">
                <div className='header'>Contact</div>
                <div>
                    <div className='flex m-3'>
                        <div className='font-semibold'>Email:</div>
                        <div className='mx-2'>austinjrch8@gmail.com</div>
                    </div>
                    <div className='flex m-3'>
                        <div className='font-semibold'>Phone:</div>
                        <div className='mx-2'>(952)-500-3024</div>
                    </div>
                    <div className='m-3'>
                        <div>Minneapolis, MN</div>
                    </div>
                </div>
                <div className='m-3 flex flex-col'>
                    <div className='font-semibold mb-2'>Other Sites</div>
                    <a className='my-1 mx-2 text-blue-600' href="https://github.com/AJJ22">GitHub</a>
                    <a className='my-1 mx-2 text-blue-600' href="https://www.linkedin.com/in/austin-jerich-75a120119/">LinkedIn</a>
                </div>
            </div>
        </div>
    )
}