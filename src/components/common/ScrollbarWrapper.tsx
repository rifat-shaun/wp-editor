import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

function ScrollbarWrapper({ children }: { children: React.ReactNode }) {
	return (
		<Scrollbars
			autoHide
			autoHideTimeout={1000}
			autoHideDuration={1000}
			universal
			renderThumbVertical={(props) => (
				<div
					{...props}
					style={{
						backgroundColor: "rgba(100, 100, 100, 0.5)",
						borderRadius: "6px",
					}}
				/>
			)}
			renderTrackVertical={(props) => (
				<div
					{...props}
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.05)",
					}}
					onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)")}
					onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)")}
				/>
			)}
		>
			{children}
		</Scrollbars>
	);
}

export default ScrollbarWrapper;
