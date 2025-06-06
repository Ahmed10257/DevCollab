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
        }
    }

    stage('Build Docker Images') {
      steps {
        sh "docker build -t $IMAGE_FRONTEND ./front-end"
        sh "docker build -t $IMAGE_BACKEND ./back-end"
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
