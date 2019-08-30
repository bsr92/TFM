# Realiza el registro de la identificaciones en la cadena de bloques a traves de una llamada a la transaccion definida en el modelo de Hyperledger mediante una API-REST
import json
import requests
import base64
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

# Funcion que descarga el fichero de Google Drive
def descargaFichero():
	# Autenticacion en Google Drive
	gauth = GoogleAuth()
	gauth.LocalWebserverAuth()

	drive = GoogleDrive(gauth)

	# Descarga del fichero
	file3 = drive.CreateFile({'id': '1JpLaSM9kSomNcEv6mMuvUXry4yl-buqr'})
	print('Descargando el fichero %s de Google Drive' % file3['title']) 
	file3.GetContentFile('identificacion.json')
	print('Fichero descargado')  

# Funcion que procesa el fichero descargado
def leeFichero():
	print('Procesando el fichero')
	with open('identificacion.json') as json_file:
	    data = json.load(json_file)
	return data
	print('Fichero procesado')

# Funcion que escribe en la cadena de bloques el fichero procesado a traves de una llamada a la API de Hyperledger definida
def escribeBlockchain(data_json):
	print('Escribiendo en la cadena de bloques...')
	resp = requests.post('http://localhost:3000/api/org.basic.identificacion.FacialRecognition', json=data_json)
	print('Escritura realizada...')

# Funcion main
def main():
	descargaFichero()
	data_json = leeFichero()
	escribeBlockchain(data_json)

if __name__ == "__main__":
	main()
