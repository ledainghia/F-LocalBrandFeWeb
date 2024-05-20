pipeline {
    agent any

    stages {
        stage('Packaging') {
            steps {
                withCredentials([
                    string(credentialsId: 'GOOGLE_CLIENT_ID', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'GOOGLE_CLIENT_SECRET', variable: 'GOOGLE_CLIENT_SECRET'),
                    string(credentialsId: 'NEXTAUTH_SECRET', variable: 'NEXTAUTH_SECRET')
                ]) {
                    sh '''
                        docker build --build-arg GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
                                     --build-arg CLIENT_SECRET=${GOOGLE_CLIENT_SECRET} \
                                     --build-arg SECRET_KEY=${NEXTAUTH_SECRET} \
                                     --pull --rm -f Dockerfile -t flocalbrandfeweb:latest .
                    '''
                }
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
                withCredentials([
                    string(credentialsId: 'GOOGLE_CLIENT_ID', variable: 'GOOGLE_CLIENT_ID'),
                    string(credentialsId: 'GOOGLE_CLIENT_SECRET', variable: 'GOOGLE_CLIENT_SECRET'),
                    string(credentialsId: 'NEXTAUTH_SECRET', variable: 'NEXTAUTH_SECRET')
                ]) {
                    echo 'Deploying and cleaning'
                    sh 'docker container stop flocalbrandfeweb || echo "this container does not exist"'
                    sh 'echo y | docker system prune'
                    sh '''
                        docker container run -e GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID}" \
                                             -e GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET}" \
                                             -e NEXTAUTH_SECRET="${NEXTAUTH_SECRET}" \
                                             -d --rm --name flocalbrandfeweb -p 3000:3000 chalsfptu/flocalbrandfeweb
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
