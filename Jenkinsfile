pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:latest
      command:
        - cat
      tty: true
      volumeMounts:
        - name: docker-config
          mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      secret:
        secretName: regcred
"""
    }
  }

  environment {
    IMAGE_FRONTEND = 'devcollab-frontend'
    IMAGE_BACKEND  = 'devcollab-backend'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git credentialsId: 'github-creds', url: 'https://github.com/Ahmed10257/DevCollab.git', branch: 'main'
      }
    }

    stage('Debug') {
      steps {
        sh 'pwd && ls -l'
        sh 'ls -l ./front-end'
        sh 'ls -l ./back-end'
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
                --verbosity=info \
                --skip-tls-verify
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
