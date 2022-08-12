import React, { useEffect, useState } from "react";
import { KBFITapi } from "../../api";
import Logo from "./../../img/Logo.png";
import { Link } from "react-router-dom";

export const WorkflowView = () => {
    
    const [searchWorkflows, setSearchWorkflows] = useState([]);
    const [popularWorkflows, setpopularWorkflows] = useState([]);

    const [workflow, setWorkflow] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => setSearchTerm(e.target.value);

    useEffect(() => {
        const getWorkflows = async () => {
            const { data } = await KBFITapi.get(
                `/workflows?q=${searchTerm}&limit=5`
            );

            setSearchWorkflows(data.workflows);
        };

        if (searchTerm.length > 0) {
            getWorkflows();
        }

        if (searchTerm.length === 0) {
            setSearchWorkflows([]);
        }

        if (searchTerm == "") {
            setSearchTerm("");
        }
    }, [searchTerm]);

    useEffect(() => {
        const getPopularWorkflows = async () => {
            const { data } = await KBFITapi.get(
                `/workflows?popular=true&limit=3`
            );

            setpopularWorkflows(data.workflows);
        };

        getPopularWorkflows();
    }, []);

    return (
        <>
            {/* <div className="element">
                <div className="element__txt">
                    <a href="#">
                        <p>Help Center</p>
                    </a>
                </div>
            </div> */}

            <section className="content-primary">
                <img className="content-primary__img" src={Logo} />
                <p className="content-primary__p">Find your solution</p>
            </section>

            <div className="search">
                <div className="search__bar_container">
                    <div className="search__bar">
                        <input
                            className="search__bar__input"
                            onChange={handleSearch}
                            spellCheck="false"
                            value={searchTerm}
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                </div>
                {searchWorkflows.length > 0 && (
                    <ul className="search__results">
                        {searchWorkflows.map((workflow, index) => (
                            <li key={index}>
                                <Link
                                    key={workflow._id}
                                    to={`workflow/${workflow._id}`}
                                >
                                    {workflow.workflow_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="table">
                <div className="table-2">
                    <div className="accordion" id="accordionExample">
                        {popularWorkflows.map((workflow, index) => (
                            <div className="accordion-item" key={index}>
                                <h2
                                    className="accordion-header"
                                    id={`heading${index}`}
                                >
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="false"
                                        aria-controls={`#collapse${index}`}
                                    >
                                        {workflow.workflow_name}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        {workflow.workflow_description}
                                        <hr />
                                        <Link
                                            to={`/workflow/${workflow._id}`}
                                            className="btn btn-info"
                                        >
                                            Go to this workflow
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
