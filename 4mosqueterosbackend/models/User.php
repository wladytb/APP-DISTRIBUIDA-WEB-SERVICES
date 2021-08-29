<?php
    class User extends Connection{
        public function getUser(){
            $connection = new Connection();
            $sql ="SELECT * FROM users";
            $sql = $connection->prepare($sql);
            $sql->execute();
            return $result=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function insert_user($userName,$password,$firstName,$lastName,$email,$photo,$idApis,$api){
            $connection = new Connection();
            $sql ="INSERT INTO users(userName,password,firstName,lastName,email,photo,idApis,api) VALUES(?,?,?,?,?,?,?,?)";
            $sql = $connection->prepare($sql);
            $sql->bindValue(1,$userName);
            $sql->bindValue(2,$password);
            $sql->bindValue(3,$firstName);
            $sql->bindValue(4,$lastName);
            $sql->bindValue(5,$email);
            $sql->bindValue(6,$photo);
            $sql->bindValue(7,$idApis);
            $sql->bindValue(8,$api);
            $sql->execute();
            return $result=$sql->fetchAll(PDO::FETCH_ASSOC);
        }
    }
?>