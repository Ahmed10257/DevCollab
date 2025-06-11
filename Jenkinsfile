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

    stage('Check Git Subdirs') {
      steps {
        git credentialsId: 'github-creds', url: 'https://github.com/Ahmed10257/DevCollab.git', branch: 'main'
        sh 'ls -l && ls -l front-end && ls -l back-end'
      }
}

    stage('Build Images with Kaniko') {
      steps {
        container('kaniko') {
          script {
            def builds = [
              [name: 'frontend', dir: 'front-end'],
              [name: 'backend', dir: 'back-end']
            ]

            for (def build : builds) {
              sh """
              /kaniko/executor \
                --context=/workspace/${build.dir} \
                --dockerfile=/workspace/${build.dir}/Dockerfile \
                --destination=docker.io/ahmed10257/devcollab-${build.name}:latest \
                --verbosity=info
              """
            }
          }
        }
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
