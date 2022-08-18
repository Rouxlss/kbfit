import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

export const CreateWorkflowView = () => {
    const [solutions, setSolutions] = useState(1);
    const [subsolutions, setSubsolutions] = useState([]);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user.role !== "62fde1342751294454ebc13b") {
            navigate("/dashboard");
        }
    }, []);

    const submitWorkflow = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="create-workflow p-5">
                <form onSubmit={submitWorkflow}>
                    <div className="mb-3">
                        <label htmlFor="workflow-name" className="form-label">
                            Workflow Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="workflow-name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Workflow Description
                        </label>
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                            ></textarea>
                            <label htmlFor="floatingTextarea2">
                                Description here...
                            </label>
                        </div>
                    </div>
                    <hr />

                    {Array.from({ length: solutions }).map(
                        (solution, index) => (
                            <div className="mb-3 bg-light p-3" key={index}>
                                {index}
                                <label
                                    htmlFor="workflow-name"
                                    className="form-label"
                                >
                                    Solution Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="workflow-name"
                                />
                                <label
                                    htmlFor="workflow-name"
                                    className="form-label"
                                >
                                    Solution Description
                                </label>
                                <textarea
                                    className="form-control  mb-2"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                ></textarea>
                                <div className="mb-3 bg-secondary p-3">
                                    {Array.from({
                                        length: subsolutions[index],
                                    }).map((subolution, j) => (
                                        <div key={j}>
                                            <label
                                                htmlFor="workflow-name"
                                                className="form-label text-white"
                                            >
                                                Sobsolution
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                id="workflow-name"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            let totalOfSubsolutions =
                                                subsolutions.length;

                                            if (totalOfSubsolutions === 0) {
                                                setSubsolutions([1]);
                                            } else {
                                                let subsolutionsCopy = [
                                                    ...subsolutions,
                                                ];
                                                console.log(subsolutionsCopy)
                                                let existingSubsolutions = subsolutionsCopy[index];
                                                console.log(existingSubsolutions)
                                                if(!existingSubsolutions) {
                                                    subsolutionsCopy[index] = 1;
                                                }else {
                                                    subsolutionsCopy[index] += 1;
                                                }
                                                setSubsolutions(subsolutionsCopy);
                                            }
                                        }}
                                        className="btn btn-primary w-25"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                    <div className="d-flex justify-content-around">
                        <button
                            onClick={() => setSolutions(solutions + 1)}
                            className="btn btn-primary w-25"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                            onClick={() => setSolutions(solutions - 1)}
                            className="btn btn-primary w-25"
                        >
                            <i className="fa-solid fa-minus"></i>
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};
