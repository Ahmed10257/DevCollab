pipeline {
  agent any

  environment {
    IMAGE_FRONTEND = 'devcollab-frontend'
    IMAGE_BACKEND  = 'devcollab-backend'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git credentialsId: 'github-creds', url: 'https://github.com/Ahmed10257/DevCollab.git', branch: 'main'      }
    }

    stage('Debug') {
      steps {
        sh 'pwd && ls -l'
        sh 'ls -l ./front-end'
        }
    }

    stage('Start BuildKit Daemon') {
      steps {
        sh 'mkdir -p /run/buildkit && buildkitd --oci-worker=false --containerd-worker=true --addr=unix:///run/buildkit/buildkitd.sock &'
        sh 'sleep 5'
        }
    }


    stage('Build ContainerD Images') {
      steps {
        sh "nerdctl build --address /run/containerd/containerd.sock build -t devcollab-frontend:latest ./front-end"
        sh "nerdctl build --address /run/containerd/containerd.sock build -t devcollab-backend:latest ./back-end"
        }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/frontend-deployment.yaml'
        sh 'kubectl apply -f k8s/backend-deployment.yaml'
      }
    }
  }

  post {
    failure {
      echo "Something went wrong!"
    }
  }
}
