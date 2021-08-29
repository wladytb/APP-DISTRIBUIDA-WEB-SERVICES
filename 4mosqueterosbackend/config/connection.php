<?php

class Connection extends PDO
	{
		private $hostBd = 'ec2-54-158-232-223.compute-1.amazonaws.com';
		private $nombreBd = 'd5lk0fhiseufs4';
		private $usuarioBd = 'qkkxttuzysvhwu';
		private $passwordBd = '4eafa3df3cc6ae67ac56e32a5477837eaa6c6763027d5df350d091ef0f62d6a8';
		
		public function __construct()
		{
			try{
                // llamar al constructor padre porque estamos haciendo una herencia
				parent::__construct('pgsql:host=' . $this->hostBd . ';port=5432;dbname=' . $this->nombreBd, $this->usuarioBd, $this->passwordBd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
				
				} catch(PDOException $e){
				echo 'Error: ' . $e->getMessage();
				exit;
			}
		}
	}

?>