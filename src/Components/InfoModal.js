import React, { useContext } from "react";
import { globalStateContext, setGlobalStateContext } from "../App";

export default function InfoModal() {
	const globalState = useContext(globalStateContext);
	const setGlobalState = useContext(setGlobalStateContext);

	return (
		<div className="info-modal" style={{ top: globalState.modal.top }}>
			<p className="info-modal-msg"> {globalState.modal.text} </p>
			<p
				className="close-info-modal"
				onClick={() => {
					clearTimeout(globalState.modal.timeout);
					setGlobalState({ modal: { top: "-100%" } });
				}}
			>
				x
			</p>
		</div>
	);
}
