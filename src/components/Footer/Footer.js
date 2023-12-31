import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className='py-2 bg-dark'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-white text-center">&copy; {year}. All Rights Reserved.</p>
                        <p className="mb-0 text-white text-center">Created By WMA-103780.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
