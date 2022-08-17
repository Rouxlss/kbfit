import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { KBFITapi } from "../../api";
import { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import queryString from "query-string";
import Cookies from "js-cookie";
import { Loading } from "../components";
import { UserContext } from "../../context";

export const WorkflowItemView = () => {

    const params = useParams();

    const { isLoading } = useContext(UserContext);

    const [workflowId, setWorkflowId] = useState(null);
    const [workflow, setWorkflow] = useState(null);
    const [error, setError] = useState(null);
    const [userSelectionSteps, setUserSelectionSteps] = useState([]);
    const [isRecording, setIsRecording] = useState(null);
    const [isSaving, setIsSaving] = useState(null);
    const [savedInfo, setSavedInfo] = useState(null);
    const [link, setLink] = useState(null);
    const [isCopied, setIsCopied] = useState(null);

    const [savedSteps, setSavedSteps] = useState([]);
    const [savedStepsMode, setSavedStepsMode] = useState(null);
    const [recordingId, setrecordingId] = useState(null);

    const [savedStepIndex, setSavedStepIndex] = useState(0);

    const saveSteps = async () => {
        try {
            const { data } = await KBFITapi.post(`/savedsteps`, {
                workflow_id: workflowId,
                steps: userSelectionSteps,
            }, {
                headers: {
                    Authorization: `${Cookies.get("accessToken")}`
                }
            });

            setLink(window.location.href + "?recordingId=" + data.id);
        } catch (error) {
            setError({
                message: error.message,
                status: error.status,
            });
        }
    };

    useEffect(() => {
        const { id } = params;
        setWorkflowId(id);

        const isRecordingId = queryString.parse(window.location.search);

        if (isRecordingId.recordingId) {
            setrecordingId(isRecordingId.recordingId);
            setSavedStepsMode(true);
        }
    }, []);

    useEffect(() => {
        if (workflowId) {
            const getWorkflow = async () => {
                try {
                    const { data } = await KBFITapi.get(
                        `/workflows/${workflowId}`,
                        {
                            headers: {
                                Authorization: `${Cookies.get("accessToken")}`,
                            },
                        }
                    );
                    console.log(data.workflow);
                    setWorkflow(data.workflow);
                } catch (error) {
                    setError({
                        message: error.message,
                        status: error.status,
                    });
                }
            };

            getWorkflow();
        }
    }, [workflowId]);

    useEffect(() => {
        if (recordingId) {
            const getSteps = async () => {
                try {
                    const { data } = await KBFITapi.get(
                        `/savedsteps/${recordingId}`, {
                            headers: {
                                Authorization: `${Cookies.get("accessToken")}`
                            }
                        }
                    );
                    setSavedSteps(data.savedSteps.steps);
                } catch (error) {
                    setError({
                        message: error.message,
                        status: error.status,
                    });
                }
            };

            getSteps();
        }
    }, [recordingId]);

    return (
        <>
            <div className="steps-buttons">
                {savedStepsMode && (
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <p>
                            Steps: {savedStepIndex} / {savedSteps.length}{" "}
                        </p>
                        <button
                            className="btn btn-outline-dark"
                            // type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={savedSteps[savedStepIndex - 1]}
                            aria-expanded="false"
                            aria-controls={savedSteps[savedStepIndex - 1]}
                            onClick={() => {
                                savedStepIndex > 0
                                    ? setSavedStepIndex(savedStepIndex - 1)
                                    : null;
                            }}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-outline-dark"
                            type="button"
                            // disabled={savedStepIndex > savedSteps.length ? "true" : "false"}
                            data-bs-toggle="collapse"
                            data-bs-target={savedSteps[savedStepIndex]}
                            aria-expanded="false"
                            aria-controls={savedSteps[savedStepIndex]}
                            onClick={() => {
                                savedStepIndex < savedSteps.length
                                    ? setSavedStepIndex(savedStepIndex + 1)
                                    : setSavedStepIndex(savedStepIndex);
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            {isRecording && (
                <div className="recording-status">
                    Recording actions{" "}
                    <i className="fa-solid fa-signal-stream"></i>
                </div>
            )}
            {isSaving && (
                <div className="saving-status">
                    Saving
                    <div
                        className="spinner-border text-dark spinner-border-sm"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>{" "}
                </div>
            )}
            {(workflow && !savedInfo && (
                <div className="table">
                    <div className="table-2">
                        <p className="fs-2">
                            {workflow.workflow_name}
                            {/* <br /><b><small>visits: {workflow.visiting_count}</small></b> */}
                        </p>
                        <div className="accordion" id="solutions">
                            {workflow.solutions.map(
                                (solution, solutionIndex) => (
                                    <div
                                        className="accordion-item"
                                        key={solutionIndex}
                                    >
                                        <h2
                                            className="accordion-header"
                                            id={`heading${solutionIndex}`}
                                        >
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${solutionIndex}`}
                                                aria-expanded="false"
                                                aria-controls={`#collapse${solutionIndex}`}
                                                onClick={() => {
                                                    if (!savedStepsMode) {
                                                        setIsRecording(true);
                                                        setUserSelectionSteps([
                                                            ...userSelectionSteps,
                                                            `#collapse${solutionIndex}`,
                                                        ]);
                                                    }
                                                }}
                                            >
                                                {solution.solution_title}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${solutionIndex}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${solutionIndex}`}
                                            data-bs-parent="#solutions"
                                        >
                                            <div className="accordion-body">
                                                {solution.solution_info}
                                                <div
                                                    className="accordion"
                                                    id={`solutions_thread${solutionIndex}`}
                                                >
                                                    <br />
                                                    {solution.solutions_thread.map(
                                                        (
                                                            thread,
                                                            threadIndex
                                                        ) => (
                                                            <div
                                                                className="accordion-item"
                                                                key={
                                                                    threadIndex
                                                                }
                                                            >
                                                                <h2
                                                                    className="accordion-header"
                                                                    id={`headingThread${threadIndex}${solutionIndex}`}
                                                                >
                                                                    <button
                                                                        className="accordion-button collapsed"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#collapseThread${threadIndex}${solutionIndex}`}
                                                                        aria-expanded="false"
                                                                        aria-controls={`#collapseThread${threadIndex}${solutionIndex}`}
                                                                        onClick={() => {
                                                                            if (
                                                                                !savedStepsMode
                                                                            ) {
                                                                                setIsRecording(
                                                                                    true
                                                                                );
                                                                                setUserSelectionSteps(
                                                                                    [
                                                                                        ...userSelectionSteps,
                                                                                        `#collapseThread${threadIndex}${solutionIndex}`,
                                                                                    ]
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        {
                                                                            thread.solution_title
                                                                        }
                                                                    </button>
                                                                </h2>
                                                                <div
                                                                    id={`collapseThread${threadIndex}${solutionIndex}`}
                                                                    className="accordion-collapse collapse"
                                                                    aria-labelledby={`headingThread${threadIndex}${solutionIndex}`}
                                                                    data-bs-parent={`#solutions_thread${solutionIndex}`}
                                                                >
                                                                    <div className="accordion-body">
                                                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                                            {!savedStepsMode && (
                                                                                <button
                                                                                    className="btn btn-dark"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target={
                                                                                        `${threadIndex}` ==
                                                                                        solution
                                                                                            .solutions_thread
                                                                                            .length -
                                                                                            1
                                                                                            ? `#collapseThread${threadIndex}${solutionIndex}`
                                                                                            : `#collapseThread${
                                                                                                  threadIndex +
                                                                                                  1
                                                                                              }${solutionIndex}`
                                                                                    }
                                                                                    aria-expanded="false"
                                                                                    aria-controls={
                                                                                        `${threadIndex}` ==
                                                                                        solution
                                                                                            .solutions_thread
                                                                                            .length -
                                                                                            1
                                                                                            ? `#collapseThread${threadIndex}${solutionIndex}`
                                                                                            : `#collapseThread${
                                                                                                  threadIndex +
                                                                                                  1
                                                                                              }${solutionIndex}`
                                                                                    }
                                                                                    onClick={() => {
                                                                                        setIsRecording(
                                                                                            true
                                                                                        );
                                                                                        setUserSelectionSteps(
                                                                                            [
                                                                                                ...userSelectionSteps,
                                                                                                `${threadIndex}` ==
                                                                                                solution
                                                                                                    .solutions_thread
                                                                                                    .length -
                                                                                                    1
                                                                                                    ? `#collapseThread${threadIndex}${solutionIndex}`
                                                                                                    : `#collapseThread${
                                                                                                          threadIndex +
                                                                                                          1
                                                                                                      }${solutionIndex}`,
                                                                                            ]
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    Next{" "}
                                                                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>

                                                <hr />
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                    {(!savedStepsMode && (
                                                        <>
                                                            <button
                                                                className="btn btn-outline-success"
                                                                type="button"
                                                                onClick={() => {
                                                                    setIsSaving(
                                                                        true
                                                                    );
                                                                    setIsRecording(
                                                                        false
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            setIsSaving(
                                                                                false
                                                                            );
                                                                            setSavedInfo(
                                                                                true
                                                                            );
                                                                            saveSteps();
                                                                        },
                                                                        1000
                                                                    );
                                                                }}
                                                            >
                                                                Solved{" "}
                                                                <i className="fa-solid fa-badge-check"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-dark"
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={
                                                                    `${solutionIndex}` ==
                                                                    workflow
                                                                        .solutions
                                                                        .length -
                                                                        1
                                                                        ? `#collapse${solutionIndex}`
                                                                        : `#collapse${
                                                                              solutionIndex +
                                                                              1
                                                                          }`
                                                                }
                                                                aria-expanded="false"
                                                                aria-controls={
                                                                    `${solutionIndex}` ==
                                                                    workflow
                                                                        .solutions
                                                                        .length -
                                                                        1
                                                                        ? `#collapse${solutionIndex}`
                                                                        : `#collapse${
                                                                              solutionIndex +
                                                                              1
                                                                          }`
                                                                }
                                                                onClick={() => {
                                                                    setIsRecording(
                                                                        true
                                                                    );
                                                                    setUserSelectionSteps(
                                                                        [
                                                                            ...userSelectionSteps,
                                                                            `${solutionIndex}` ==
                                                                            workflow
                                                                                .solutions
                                                                                .length -
                                                                                1
                                                                                ? `#collapse${solutionIndex}`
                                                                                : `#collapse${
                                                                                      solutionIndex +
                                                                                      1
                                                                                  }`,
                                                                        ]
                                                                    );
                                                                }}
                                                            >
                                                                Didn't work{" "}
                                                                <i className="fa-solid fa-ban"></i>
                                                            </button>
                                                        </>
                                                    )) || (
                                                        <>
                                                            <button className="btn btn-outline-success">
                                                                Solved{" "}
                                                                <i className="fa-solid fa-badge-check"></i>
                                                            </button>
                                                            <button className="btn btn-dark">
                                                                Didn't work{" "}
                                                                <i className="fa-solid fa-ban"></i>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <br />
                    </div>
                </div>
            ))}
            {
                savedInfo &&
                (
                    <div className="table">
                        <div className="table-2">
                            <div className="card">
                                <h5 className="card-title">
                                    Your recording is here:{" "}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Copy the next link to access to the steps that
                                    you do to get your solution!
                                </h6>
                                <div className="card-body">
                                    <CopyToClipboard
                                        text={link}
                                        onCopy={() => {
                                            setIsCopied(true);
                                            setTimeout(() => {
                                                setIsCopied(false);
                                            }, 3000);
                                        }}
                                    >
                                        <div className="link-copy">
                                            <span>{link}</span>
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <br />
                            {isCopied && (
                                <div className="alert alert-success" role="alert">
                                    Copied!
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
            { isLoading && <Loading /> }
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            )}
        </>
    );
};
