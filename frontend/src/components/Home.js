import portrait from './../images/156x182.jpg'
import NavBar from './NavBar.js'

export default function home(){
    return (
        <div>
            <NavBar />
            <div className="flex  relative py-5 px-10 h-[90vh] z-10">
                <div className='flex flex-col w-1/2'>
                    <div className='flex'>
                        <img className="mr-14" alt="Headshot of Austin Jerich" src={portrait} />
                        <div>
                            <div className='text-5xl font-bold py-3 tracking-widest'>Austin</div>
                            <div className='text-5xl font-bold py-3 tracking-widest'>Jerich</div>
                        </div>
                    </div>
                    
                    <div className="w-2/3">
                        <h4 className='font-semibold text-2xl mt-10 mb-2'>About Me</h4>
                        <div>
                            I am a software engineering professional actively searching for new employment opportunities.
                        </div>
                        <div>
                            I received a BS in computer science in 2019. Since then, I have held 2 engineering positions. The majority of my career was spent at 
                            <a className='text-blue-500' href="https://www.epicor.com/en-us/"> Epicor Software</a>. I left Epicor because I would like to gain professional experience 
                            outside of ERP development.
                        </div>
                        <br/>
                        <div>
                            Epicor is an ERP (Enterprise Resource Planning) software company. I mainly worked on Epicor Kinetic, a SaaS cloud application that assists 
                            manufacturers and retailers in efficiently running their businesses.
                        </div>
                        <br/>
                        <div>
                            I started this project as skill building exercise to help me learn React, but also to use as something to demonstrate my web application development 
                            knowledge. I plan to continue working on the site by embedding some of my previous and upcoming side projects.
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center'>
                    <div className='m-10'>
                        <div className='text-4xl font-bold'>Education</div>
                        <div className='m-3'>
                            <div className='font-extrabold my-2'>BS - Computer Science</div>
                            <div className='m-2'>Buena Vista University - Storm Lake, Iowa</div>
                            <div className='m-2'>Graduated, May 2019</div>
                        </div>
                        <div className='m-3'>
                            <div className='font-extrabold my-2'>High School Diploma</div>
                            <div className='m-2'>Eden Prairie High School</div>
                            <div className='m-2'>Graduated 2015</div>
                        </div>
                    </div>

                    <div className='m-10'>
                        <div className='text-4xl font-bold'>Contact</div>
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
            </div>
        </div>
    )
}