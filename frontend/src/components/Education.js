import NavBar from './NavBar.js';

export default function education(){
    return(
        <div>
            <NavBar />
            <div className="page-tailwind">
                <div className='header'>Education</div>
                <div className='m-3'>
                    <div className='font-extrabold my-2'>BS - Computer Science</div>
                    <div className='m-2'>Buena Vista University - Storm Lake, Iowa</div>
                    <div className='m-2'>Graduated, May 2019 - GPA 3.12</div>
                </div>
                <div className='m-3'>
                    <div className='font-extrabold my-2'>High School Diploma</div>
                    <div className='m-2'>Eden Prairie High School</div>
                    <div className='m-2'>Graduated 2015</div>
                </div>
            </div>
        </div>
    )
}