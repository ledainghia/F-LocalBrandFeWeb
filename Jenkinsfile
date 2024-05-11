pipeline {

    agent any

    
    stages {

        stage('Packaging') {

            steps {
                
                sh 'docker build --pull --rm -f Dockerfile -t flocalbrandfeweb:latest .'
                
            }
        }

        stage('Push to DockerHub') {

            steps {
                withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    sh 'docker tag flocalbrandfeweb:latest chalsfptu/flocalbrandfeweb:latest'
                    sh 'docker push chalsfptu/flocalbrandfeweb:latest'
                }
            }
        }

        stage('Deploy FE to DEV') {
            steps {
                echo 'Deploying and cleaning'
                sh 'docker container stop flocalbrandfeweb || echo "this container does not exist" '
                sh 'echo y | docker system prune '
                sh 'docker container run -d --rm --name flocalbrandfeweb -p 83:80  chalsfptu/flocalbrandfeweb '
            }
        }
        
 
    }
    post {
        always {
            cleanWs()
        }
    }
}