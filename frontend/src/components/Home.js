import portrait from './../images/156x182.jpg';
import NavBar from './NavBar.js';

export default function home(){
    return (
        <div>
            <NavBar />
            <div className="page-tailwind">
                <div className='flex'>
                    <img className="mr-14" alt="Headshot of Austin Jerich" src={portrait} />
                    <div>
                        <div className='text-5xl font-bold py-3 tracking-widest'>Austin</div>
                        <div className='text-5xl font-bold py-3 tracking-widest'>Jerich</div>
                    </div>
                </div>
                
                <div className="w-2/4">
                    <h4 className='font-semibold text-2xl mt-10 mb-2'>About Me</h4>
                    <div>
                        I am a software engineering professional actively searching for new employment opportunities. 
                    </div>
                    <div>
                        I received a BS in computer science in 2019. Since then, I have held 2 engineering positions. The majority of my career was spent at 
                        <a href="https://www.epicor.com/en-us/">Epicor Software</a>. I left Epicor because I would like to gain professional experience 
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
                        knowledge. I plan to continue working on the site by embedding some of my previous side projects that I have done over the years.
                    </div>
                </div>
            </div>
        </div>
    )
}