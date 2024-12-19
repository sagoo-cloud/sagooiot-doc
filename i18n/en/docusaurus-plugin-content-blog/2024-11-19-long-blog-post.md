---
slug: sagooiot2.4.0
title: SagooIoT 2.4.0 Version Release
authors: [microrain]
tags: [sagooiot doc]
---

Starting from SagooIoT 2.4 version, the visual configuration editor, visual dashboard editor, and visual rule engine are now integrated with the main project's UI. After pulling the code, it can be run directly without requiring separate compilation and installation.

{/* truncate */}

Recently, we have focused on adjusting SagooIoT's frontend project, integrating the visual configuration editor, visual dashboard editor, and visual rule engine directly with the main project's UI. After pulling the code, it can be run directly without requiring separate compilation and installation. Additionally, the system now includes an embedded MQTT service, eliminating the need to install third-party MQTT service systems. This simplifies the basic environment installation to only requiring:
mysql, redis, and Tdengine - just these three database services.

The main updates in SagooIoT 2.4.0 version include:

New Features
* Updated system configuration templates
* Added management and maintenance functionality
* Added device type filtering for devices and products
* Added new version rule engine localization service
* Updated multiple dependencies to latest versions
* Updated new media streaming service

Optimizations and Improvements

* Upgraded some dependencies to latest versions
* Optimized authorization login configuration logic
* Optimized non-standard log outputs
* Direct local execution of visual configuration, visual dashboard, and visual rule engine
