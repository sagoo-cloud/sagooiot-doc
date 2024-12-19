---
slug: sagooiot-release-V2.0.0
title: SagooIoT V2.0.0 Official Release
authors: [microrain]
tags: [sagooiot, version release]
---

SagooIoT V2 Version Official Release

As planned, SagooIoT V2 version has been officially released. This version brings significant changes, focusing on structural adjustments and changes in core component processing. The interfaces maintain compatibility with V1.x versions.

For version changes, please refer to: [Version Update Log](/docs/base/history)
{/* truncate */}
- In V2, SagooIoT uniformly adopts a distributed task queue processing method across the system for real-time data processing. It implements a mechanism that supports work distribution across threads and computers, supporting distributed tasks, scheduled tasks, background tasks, decoupled tasks, and real-time processing tasks.

- Standardized plugin development methods, making them independent for easier plugin development and maintenance, while simplifying the main project's codebase.

- Introduced modular development approach, separating module functionality from core functionality for easier feature extension and maintenance, while reducing main project code complexity.

- Reorganized directory structure, unifying common processing in the pkg directory for easier feature development access and code maintenance management.

- Added support for separate running of core processing programs, web service programs, and task queue processing programs to improve program stability and reliability. (Available in paid version)

Community users can obtain SagooIoT V2 version through: https://github.com/sagoo-cloud/sagooiot

The original V1.x version will no longer be maintained and has been moved to the sagooiot-v1 branch. This applies to both frontend and backend projects.
