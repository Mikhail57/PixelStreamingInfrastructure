// Copyright Epic Games, Inc. All Rights Reserved.

import {Config, Flags, Logger, PixelStreaming} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.2';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

document.body.onload = function() {
	// Example of how to set the logger level
	// Logger.SetLoggerVerbosity(6);

	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);
	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode)
	});
	stream.addResponseEventListener('PointerLocked', (response) => {
		Logger.Log(Logger.GetStackTrace(), `PointerLocker. Got response: ${response}`)
		stream.config.setFlagEnabled(
			Flags.HoveringMouseMode,
			false
		);
	});
	stream.addResponseEventListener('PointerUnlocked', (response) => {
		Logger.Log(Logger.GetStackTrace(), `PointerUnlocker. Got response: ${response}`)
		stream.config.setFlagEnabled(
			Flags.HoveringMouseMode,
			true
		);
	});
	// document.getElementById("centrebox").appendChild(application.rootElement);
	document.body.appendChild(application.rootElement);
}
