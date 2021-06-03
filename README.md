# Urti di Galperin

Questa è una repository per una pagina web che ho progettato come parte dell'elaborato per l'Esame di Stato.
In questa pagina web, utilizzando la libreria [p5.js](https://p5js.org/) e basandomi su una pubblicazione di Gregor Galperin, [*Playing pool with pi*](https://www.maths.tcd.ie/~lebed/Galperin.%20Playing%20pool%20with%20pi.pdf), ho progettato un animazione interattiva che mostra ciò che accade nel sistema ipotizzato dallo stesso Galperin.

## Il sistema di Galperin

Nella sua pubblicazione Galperin considera un sistema privo di attrito dove due blocchi di masse arbitrarie, una inizialmente in quiete e l'altra in movimento, e un muro considerato di massa "infinita" (così da non disperdere energia e quantità di moto) urtano tra di loro in maniera completamente elastica.
Si nota che al crescere della massa del blocco inizialmente in movimento rispetto all'altra il numero di collisioni che avvengono in questo sistema andrà man mano ad approssimare le cifre del π. Si dimostra poi in maniera geometrica il perchè di questa approssimazione.

## Contenuto della pagina web

In questa pagina web ho progettato un animazione interattiva che mostra ciò che accade nel sistema ipotizzato dallo stesso Galperin.
La pagina presenta inizialmente un riquadro con due blocchi, uno *slider* (un cursore) e due bottoni, il primo etichettato **Inizia!** ed il secondo **Attiva grafico**.

+ muovendo il cursore si può notare che il testo sottostante riportante il numero di urti cambierà andando ad aumentare ogni volta il numero degli zeri presenti, contemporaneamente nel riquadro sovrastante uno dei due blocchi (dei quali sono sempre riportate le relative masse) aumentera di dimensione e di massa;
+ premendo il bottone **Inizia!** si darà il via alla animazione del riquadro sovrastante;
+ premendo il bottone **Attiva il grafico** apparirà un altro riquadro, simile a quello superiore, dove in sincrono con le collisioni dell'altro riquadro verrà tracciato un diagramma di fase; una volta premuto il bottone la sua eticchetta diventerà **Disattiva grafico** che se premuto avrà l'effetto contrario a quello iniziale.

### Accorgimenti in caso di problemi con la pagina web

Soprattutto con uno dei due blocchi con massa molto grande, nello specifico quando il cursure si trova ai settaggi più elevati (il massimo è **8**), l'animazione delle collisioni può subire un considerevole rallentamento poichè in queste situazioni la pagina web dove contare un numero molto elevato di collisioni.
**Si consiglia**, se si vuole tenere il cursore su valori prossimi al massimo, di non attivare il grafico sottostante in quanto andrebbe solamente a rallentare ulteriormente l'animazione.

Si potrebbe verificare che se si disattiva il grafico quando stanno avvenendo molti urti, la pagina smetta di rispondere; questo accade per il modo in cui il programma stesso è costruito. In pratica quando si disattiva il grafico l'audio della pagina viene anche disattivato e per riattivarlo è necessario un minimo di tempo, se prima che l'audio sia riattivato il programma richieda nuovamente l'audio si va incontro ad un errore nella pagina che conseguentemente smette di rispondere.
Quindi **si consiglia** in questi casi di disattivare il grafico quando c'è abbastanza tempo tra una collisione e l'altra.

### Risorse usate per questo progetto

Per costruire questa pagina web ho utilizzato prinicipalmente due risorse trovate in rete:

1. un video del canale *Veritasium* su Youtube che spiega la dimostrazione geometrica sottesa al sistema di Galperin, [video con la dimostrazione geometrica](https://www.youtube.com/watch?v=jsYwFizhncE);
2. un tutorial trovato in rete per aiutarmi con la programmazione di parte della pagina web, [link al tutorial per parte dell'animazione](https://thecodingtrain.com/CodingChallenges/139-pi-collisions.html)).
