pipeline {

    agent any

    
    stages {

        stage('Packaging') {

            steps {
                
                sh 'docker build --build-arg GOOGLE_CLIENT_ID=610543027503-gl1mjkhsfmsjs2mer7ck41ceoqq9ifjf.apps.googleusercontent.com --build-arg CLIENT_SECRET=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 --build-arg SECRET_KEY=adjkasdbyua --pull --rm -f Dockerfile -t flocalbrandfeweb:latest .'
                
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
                sh 'docker container run -e GOOGLE_CLIENT_ID="610543027503-gl1mjkhsfmsjs2mer7ck41ceoqq9ifjf.apps.googleusercontent.com" -e GOOGLE_CLIENT_SECRET="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" -e NEXTAUTH_SECRET="adjkasdbyua" -d --rm --name flocalbrandfeweb -p 3000:3000  chalsfptu/flocalbrandfeweb '
            }
        }
        
 
    }
    post {
        always {
            cleanWs()
        }
    }
}