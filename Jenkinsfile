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

    stage('Build and Push Images with Kaniko') {
      steps {
          script {
            def builds = [
              [name: 'frontend', dir: './front-end', subdir: 'front-end'],
              [name: 'backend', dir: './back-end', subdir: 'back-end']
            ]

            for (def build : builds) {
              sh """
              kubectl run kaniko-${build.name} --rm -i --restart=Never --namespace=default \
                --image=gcr.io/kaniko-project/executor:latest \
                --overrides='{
                  "apiVersion": "v1",
                  "spec": {
                    "containers": [{
                      "name": "kaniko",
                      "image": "gcr.io/kaniko-project/executor:latest",
                      "args": [
                        "--context=git://github.com/ahmed10257/DevCollab.git#main",
                        "--dockerfile=${build.subdir}/Dockerfile",
                        "--destination=docker.io/ahmed10257/devcollab-${build.name}:latest",
                        "--verbosity=info"
                      ],
                      "volumeMounts": [{
                        "name": "kaniko-secret",
                        "mountPath": "/kaniko/.docker"
                      }]
                    }],
                    "volumes": [{
                      "name": "kaniko-secret",
                      "secret": {
                        "secretName": "regcred",
                        "items": [{
                          "key": ".dockerconfigjson",
                          "path": "config.json"
                        }]
                      }
                    }]
                  }
                }'
              """
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
