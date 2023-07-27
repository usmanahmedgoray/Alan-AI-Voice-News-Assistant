/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import { Triangle } from "react-loader-spinner";

const Summarizer = ({ Summary, ArticleSummary }) => {

    const modalRef = useRef();
    // destructuring the elements from Summary props
    const { media, title } = Summary;
    useEffect(() => {
        modalRef.current.classList.remove('hidden')
    }, [Summary])
    
    // handle the Summary the modal
    const handleSummaryModal = () => {
        modalRef.current.classList.add('hidden')


    }
    return (
        <>

            {/* <!-- drawer component --> */}
            <div ref={modalRef} id="drawer-bottom-example" className={`w-auto md:w-[33rem] h-[38rem] bg-white border  bottom-0 fixed left-0 right-0 z-40 m-2 p-6 overflow-y-auto transition-transformdark:bg-gray-800 transform-none rounded-md `} tabIndex="-1" aria-labelledby="drawer-bottom-label">
                <div className="bg-gray-800 flex justify-between items-center py-2 px-4 rounded-xl shadow-lg shadow-gray-400 hover:shadow-gray-600 mb-4">
                    <h2 className="text-2xl font-semibold text-white select-none">Summary</h2>
                    <ImCross onClick={handleSummaryModal} className="cursor-pointer text-white hover:animate-pulse" />
                </div>
                
                {/* Image of the Summarizing Article */}
                <img src={media} alt="media" className="w-[31rem] hover:shadow-md rounded-lg" />
                {/* Title of the Summarizing Article */}
                <h2 className="mt-6 text-2xl text-justify">{title}</h2>
                {/* Summary of the Summarizing Article */}
                {ArticleSummary ? (<p className="mt-5 text-gray-700 text-lg text-justify">{ArticleSummary}</p>) : (<div className="mt-5 text-lg flex justify-center items-center"><Triangle height="80" width="80" color="#0096FF" ariaLabel="triangle-loading" wrapperStyle={{}} wrapperClassName="" visible={true}/></div>)}
                {ArticleSummary&& <div className="link my-6">
                    <h4 className="bg-gray-800 text-white w-24 text-center py-2 rounded-lg my-3">Source URL</h4>
                    <a href={Summary.link} target="_blank" rel="noreferrer" className="hover:underline underline-offset-2 hover:text-blue-800">{Summary.link}</a>
                </div>}
            </div>
        </>
    )
}

// Exporting the Summarizer.jsx component

export default Summarizer