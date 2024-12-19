---
slug: sagooiot-Preview-V2.0.0
title: SagooIoT V2.0.0 Preview
authors: [microrain]
tags: [sagooiot, version release]
---

SagooIoT V2 Version Preview

Version 2 will be released after the Spring Festival. This version brings significant changes, focusing on structural adjustments and changes in core component processing. The interfaces will maintain compatibility with V1.x versions.
In V2, SagooIoT will uniformly adopt a distributed task queue processing method for real-time data processing across the system. It implements a mechanism that supports work distribution across threads and computers, supporting distributed tasks, scheduled tasks, background tasks, decoupled tasks, and real-time processing tasks.
{/* truncate */}
In version 2.0.0, we will make the following adjustments:

1. Restructure the device data reporting processing pipeline, add intermediate cache queues to improve data reporting processing efficiency.
2. Refactor cache processing for unified usage. Cache frequently called data in multiple places to improve data processing efficiency.
3. Restructure message queue and scheduled task processing to use a distributed task queue approach, improving message queue processing efficiency and reliability, and provide a visual message queue monitoring interface.
4. Refactor code writing methods, standardize parameter input and interface processing methods to improve code readability and maintainability. Product and device-related calls will be unified using a key-based approach.
5. Adjust plugin writing methods, making them independent for easier plugin development and maintenance, while simplifying the main project's codebase.
6. Introduce modular development approach, separating module functionality from core functionality for easier feature extension and maintenance, while reducing main project code complexity.
7. Reorganize directory structure, unifying common processing in the pkg directory for easier feature development access and code maintenance management.
8. Add support for separate running of core processing programs, web service programs, and task queue processing programs to improve program stability and reliability.
9. Enhance performance analysis and monitoring capabilities for easier system performance analysis and monitoring, providing visual performance analysis and monitoring interfaces.
