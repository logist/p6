set OpenOfficePath=%ProgramFiles%\OpenOffice.org 2.2\program\soffice.exe 
set Port=8100

winserv stop p6OpenOffice
winserv uninstall p6OpenOffice
winserv install p6OpenOffice -displayname p6OpenOffice -description "Service for Prototip 6 OpenOffice reports (Dimas ltd.)" -start auto "%OpenOfficePath%" -headless -accept="socket,host=127.0.0.1,port=8100;urp;" -nofirststartwizard
winserv start p6OpenOffice
