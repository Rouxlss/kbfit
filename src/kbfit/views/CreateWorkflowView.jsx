import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { toast, ToastContainer } from "react-toastify";
import { KBFITapi } from "../../api";

export const CreateWorkflowView = () => {

    let workflowInitialState = {
        workflow_name: "",
        workflow_description: "",
        solutions: [],
    };

    let solutionInitialState = [
        {
            solution_title: "",
            solution_info: "",
            type: "solution",
            createdAt: 0,
            solutions_thread: [],
        }
    ];

    const { token } = useContext(UserContext);

    const [workflow, setWorkflow] = useState(workflowInitialState);
    const [solutionsInfo, setSolutionsInfo] = useState(solutionInitialState);

    const [saving, setSaving] = useState(false);
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

    const submitWorkflow = async (e) => {
        e.preventDefault();

        for (let i = 0; i < solutionsInfo.length; i++) {
            solutionsInfo[i].createdAt = Date.now();
        }

        console.log(solutionsInfo);

        await setWorkflow({
            ...workflow,
            solutions: solutionsInfo,
        });

        setSaving(true);
    };

    const createWorkflow = async () => {
        await KBFITapi.post(
            `/workflows/create`,
            {
                ...workflow,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        setSaving(true);
        toast.success("Workflow created successfully");
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    };

    useEffect(() => {
        if (saving) {
            try {
                createWorkflow();
            } catch (error) {
                toast.error("Error creating workflow" + error);
            }
        }
    }, [saving]);

    const increaseSubsolutions = (index) => {
        let totalOfSubsolutions = subsolutions.length;

        if (totalOfSubsolutions === 0) {
            console.warn("!!!!!!!!!!!!!!")
            let solutionsCopy = [...solutionsInfo];
            solutionsCopy[index].solutions_thread = [ { solution_title: ""} ];
            setSolutionsInfo(solutionsCopy);
            let solutionIndex = [];
            for (let i = 0; i <= index; i++) {
                i === index ? solutionIndex.push(1) : solutionIndex.push(0);
            }
            setSubsolutions(solutionIndex);
        } else {
            let subsolutionsCopy = [...subsolutions];
            let existingSubsolutions = subsolutionsCopy[index];
            if (!existingSubsolutions) {
                subsolutionsCopy[index] = 1;
            } else {
                subsolutionsCopy[index] += 1;
            }
            setSubsolutions(subsolutionsCopy);
            let solutionsCopy = [...solutionsInfo];
                solutionsCopy[index].solutions_thread.push({ solution_title: "" });
                setSolutionsInfo(solutionsCopy);
        }
    
    };

    const decreaseSubsolutions = (index) => {
        if (subsolutions[index] > 0) {
            let totalOfSubsolutions = subsolutions.length;

            if (totalOfSubsolutions === 0) {
                setSubsolutions([1]);
            } else {
                let subsolutionsCopy = [...subsolutions];
                console.log(subsolutionsCopy);
                let existingSubsolutions = subsolutionsCopy[index];
                console.log(existingSubsolutions);
                if (!existingSubsolutions) {
                    subsolutionsCopy[index] = 1;
                } else {
                    subsolutionsCopy[index] -= 1;
                }
                setSubsolutions(subsolutionsCopy);
            }
            let solutionsCopy = [...solutionsInfo];
            solutionsCopy[index].solutions_thread.pop();
            setSolutionsInfo(solutionsCopy);
        }
    };

    const increaseSolutions = () => {
        setSolutions(solutions + 1);
        setSolutionsInfo([
            ...solutionsInfo,
            {
                solution_title: "",
                solution_info: "",
                type: "solution",
                createdAt: 0,
                solutions_thread: [],
            },
        ])
    };

    const decreaseSolutions = () => {
        if (solutions > 1) {
            setSolutions(solutions - 1);
            let solutionsInfoCopy = [...solutionsInfo];
            solutionsInfoCopy.pop();
            setSolutionsInfo(solutionsInfoCopy);
        }
    };

    return (
        <>
            <ToastContainer />
            <h1
                style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    textAlign: "center",
                }}
            >
                CREATE WORKFLOW
            </h1>
            {(saving && <div className="loading">Saving...</div>) || (
                <div className="create-workflow p-5">
                    <form onSubmit={submitWorkflow}>
                        <div className="mb-3">
                            <label
                                htmlFor="workflow-name"
                                className="form-label"
                            >
                                Workflow Name
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setWorkflow({
                                        ...workflow,
                                        workflow_name: e.target.value,
                                    });
                                }}
                                value={workflow.workflow_name}
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
                                    rows={3}
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="floatingTextarea2"
                                    onChange={(e) => {
                                        setWorkflow({
                                            ...workflow,
                                            workflow_description:
                                                e.target.value,
                                        });
                                    }}
                                    value={workflow.workflow_description}
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
                                        value={
                                            solutionsInfo[index]?.solution_title
                                        }
                                        onChange={(e) => {
                                            let solutionsInfoCopy = [
                                                ...solutionsInfo,
                                            ];
                                            solutionsInfoCopy[index] = {
                                                ...solutionsInfoCopy[index],
                                                solution_title: e.target.value,
                                            };
                                            setSolutionsInfo(solutionsInfoCopy);
                                        }}
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
                                        value={
                                            solutionsInfo[index]
                                                ?.solution_info
                                        }
                                        onChange={(e) => {
                                            let solutionsInfoCopy = [
                                                ...solutionsInfo,
                                            ];
                                            solutionsInfoCopy[index] = {
                                                ...solutionsInfoCopy[index],
                                                solution_info:
                                                    e.target.value,
                                            };
                                            setSolutionsInfo(solutionsInfoCopy);
                                        }}
                                    ></textarea>
                                    <div className="mb-3 bg-secondary p-3">
                                        {Array.from({
                                            length: subsolutions[index],
                                        }).map((subsolution, j) => (
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
                                                    value={
                                                        solutionsInfo[index]
                                                            .solutions_thread[j]
                                                            .solution_title
                                                    }
                                                    onChange={(e) => {
                                                        let solutionsInfoCopy =
                                                            [...solutionsInfo];
                                                        solutionsInfoCopy[
                                                            index
                                                        ].solutions_thread[j] =
                                                            {
                                                                ...solutionsInfoCopy[
                                                                    index
                                                                ]
                                                                    .solutions_thread[
                                                                    j
                                                                ],
                                                                solution_title:
                                                                    e.target
                                                                        .value,
                                                            };
                                                        setSolutionsInfo(
                                                            solutionsInfoCopy
                                                        );
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseSubsolutions(index)
                                            }
                                            className="btn btn-primary w-25 mr"
                                            style={{ marginRight: "10px" }}
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseSubsolutions(index)
                                            }
                                            className="btn btn-primary w-25"
                                        >
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                        <div className="d-flex justify-content-around">
                            <button
                                type="button"
                                onClick={increaseSolutions}
                                className="btn btn-primary w-25"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                                type="button"
                                onClick={decreaseSolutions}
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
            )}
        </>
    );
};
