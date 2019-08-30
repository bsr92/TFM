# Realiza el setup del proyecto haciendo una llamada a la transaccion definida en el modelo de Hyperledger mediante una API-REST
import requests
import base64

# Funcion que realiza la inicializacion del proyecto haciendo la llamada a la API de Hyperledger previamente definida
def setupBlockchain():
	print("Realizando inicializacion del proyecto...")
	resp = requests.post('http://localhost:3000/api/org.basic.identificacion.setupProject')
	print("Inicializacion realizada")

# Funcion main
def main():
	setupBlockchain()

if __name__ == "__main__":
	main()
