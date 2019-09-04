---
title: Kubernetes Notes
published: true
---

This post contains referential material, and as such, is not meant to be read sequentially. This contains a handful of notes for developing with or using Kubernetes, and attempts to remove the confusion around the various concepts needed for understanding Kubernetes.

----

## Key Terms

#### &nbsp;

| | |
|--:|---|
| [Master](https://kubernetes.io/docs/concepts/overview/components/#master-components) | A master Kubernetes node. This is made up of the `apiserver`, the Cluster Store (`etcd`), `kube-controller-manager`, `cloud-controller-manager`, and `kube-scheduler`. The Master delegates work to the Nodes. |
| [Node](https://kubernetes.io/docs/concepts/architecture/nodes/) | An agent that receives work from a Master. Previously known as a minion. The Node is made up of the `Kubelet`, a container engine (almost always `Docker`), and the `kube-proxy`. |
| [Cluster](https://kubernetes.io/docs/concepts/architecture/master-node-communication/) | When people refer to the Cluster in Kubernetes, they are usually referring to the Cluster of nodes in which the Master communicates to. A pod, however, may contain a cluster of containers as well. |
| [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) | The most atomic execution unit. It encapsulates your application (in a container, or multiple containers), storage resources, and gives it a unique IP. Scaling is based around pods, such that if you want to scale an application, you increase the number of pods as opposed to increasing the number of containers in the pod. It is mortal in the sense that it is born, it lives, and then it dies. Pods are never resurrected. Pods are defined by manifests. |
| [Declarative Model](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/) | A model in which you define what you want your desired state to be. You only describe what you want, and not how to go about reaching it. This is opposed to an imperative model where you define the exact steps to perform to achieve your desired state. |
| [Manifest](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#organizing-resource-configurations) | A YAML file that defines the desired state of an application. |
| [Service](https://kubernetes.io/docs/concepts/services-networking/service/) | A Kubernetes object similar to a pod. The service acts as a load balancer with a stable IP. You can assign pods to services via labels. Services will only route traffic to healthy pods. The load balancing is random by default but can be set to round robin. It serves TCP by default but can also use UDP. |
| [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) | Deployments are controlled with a manifest file, and allow you to define the state of pods and ReplicaSets. |
| [Replication Controller](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/) | Replication controllers enable Kubernetes to deploy multiple replicas of a single pod definition. Useful for scaling, self-healing, and rolling updates. |
| [apiserver](https://github.com/kubernetes/apiserver) | The frontend of the master where all communication occurs. Both the user (usually through `kubectl`) and the cluster communicate to the apiserver. |

----

## Tools

### [Kubernetes](https://github.com/kubernetes/kubernetes)

#### Description

| | |
|--:|---|
| Who | Kubernetes is for companies that want scalability, redundancy, availability, and faster deployment cycles. |
| What | A container orchestration platform that manages resources, networking, failover, and various other features. |
| Where | Kubernetes can be hosted on a cloud service such as [Google's Kubernetes Engine](https://cloud.google.com/kubernetes-engine/), Minikube for local development, or as an on premise deployment. |
| When | Used at the end of the development lifecycle to handle deployments and production infrastructure. |
| Why | Modern deployments __are__ performance-centric. The speed of deployment needs to be fast. There is a need for burst scaling. The need for easier, faster, and safer A/B testing and canary deployments is also there. Everything needs to be quick to put in place, quick to revert, and quick to change. |
| How | Kubernetes does this by using a Masters and Nodes to manage resources. Detailed information on how Kubernetes does this can be found [here](https://kubernetes.io/docs/concepts/architecture/). Pluralsight offers a good introductory course for [Getting Started with Kubernetes](https://app.pluralsight.com/library/courses/getting-started-kubernetes). |

### [Minikube](https://github.com/kubernetes/minikube)

#### Description

| | |
|--:|---|
| Who | Minikube is for developers. |
| What | Allows developers to run a Kubernetes cluster. |
| Where | On the developer's computer. |
| When | During the development phase. |
| Why | Developers can test out deployments locally for quicker testing purposes, or to mitigate costs of cloud deployments. The principles of Minikube can be found [here](https://minikube.sigs.k8s.io/docs/concepts/principles/). |
| How | [Minikube Guide](https://kubernetes.io/docs/setup/learning-environment/minikube/#quickstart) and [Installation Instructions](https://kubernetes.io/docs/tasks/tools/install-minikube/) |

#### Commands

##### Create a Kubernetes cluster with Minikube on Windows/Hyper-V using the Default Network Switch

```sh
minikube start --vm-driver="hyperv" --hyperv-virtual-switch="Default Switch"
```

##### Open a dashboard in your browser to view your cluster

```sh
minikube dashboard
```
