// js utils p6
// dimas 2001-2003 kis, shu 030921
//   shu 031028-�������� ������ �� ����������, ������������� ��������� ����


//***   Window   ***********************************************************

// ��������� ��� ����
function GetWindowFeatures()
{
  return "left=0, top=0, width="+(screen.Width-20)+", height="+(screen.Height-75)+", resizable=yes, status=no, location=no, scrollbars=yes, toolbar=no";
}

// ��������� ��� ���� ����
function GetMenuFeatures()
{
  return "left=220, top=0, width="+(screen.Width-232)+", height="+(screen.Height-100)+", resizable=yes, status=no, location=no, scrollbars=yes, toolbar=no"; 
}

// ��������� ��� ����������� ����
function GetModalWindowFeatures()
{
  return "dialogHeight="+(screen.Height-75)
	+"px; height="+(screen.Height-75)
	+"px; dialogWidth="+(screen.Width)
	+"px; width="+(screen.Width)
	+"px; left=0"
	+"px; top=0"
	+"px; status=no; maximize=yes; help=no";
}

// ��������� ��� ����������� ���� � 1/4 ������
function GetModalWindowFeatures4()
{
  return "dialogHeight="+((screen.Height)/2)+"px; dialogWidth="+((screen.Width)/2)+"px; status=no; maximize=yes; help=no";
}

// ����������� ��������� ���� ��� �������
function GetReportFeatures()
{
  return "left=0, top=0, width="+(screen.Width-20)+", height="+(screen.Height-150)+
  ", resizable=yes, status=yes, location=no, scrollbars=yes, toolbar=no, menubar=yes";
}

// ����������� ��������� ���� ��� ����� �������,
//   ������� ����� ����� ��� ������ ������
function GetFormReportFeatures()
{
  return "left=0, top=0, width="+(screen.Width-20)+", height="+(screen.Height-100)+
  ", resizable=yes, status=yes, location=no, scrollbars=yes, toolbar=no, menubar=no";
}

// ����������� ��������� ���� ��� ����������
function GetInstructionFeatures()
{
  return "left=0, top=0, width="+(screen.Width-20)+", height="+(screen.Height-150)+
  ", resizable=yes, status=yes, location=no, scrollbars=yes, toolbar=yes, menubar=yes";
}


// �������� �������� � ����� ��������� ����
function OpenModalWindow(wUrl, wName, ftr)
{
  var modalResult = "", flag=1
  if ((wName == null) || (wName == undefined)|| (wName == "")) {
     wName=Piece(wUrl,"?",1)
	  wName = wName.replace(/[.\-\+\?\&\%\\\/]/g,"_");
  }
  if ((ftr == '') || (ftr == null) || (ftr == undefined)) ftr = GetModalWindowFeatures();

  if (zenLaunchPopupWindow!=undefined) {
    return zenLaunchPopupWindow(wUrl, wName, ftr);
  }

  var str='string'+document.location;
  if (str.indexOf('test/')==-1) {
   do {
		modalResult = window.showModalDialog(wUrl, wName, ftr);
	} while (modalResult == "%reload%");
   return modalResult;
  } else {
	  window.location=wUrl;
  }
}

// �������� �������� � ����� ����
function OpenWindow(wUrl, wName, ftr)
{
  if ((wName == null) || (wName == undefined) || (wName == "")) {
     wName=Piece(wUrl,"?",1)
	  wName = wName.replace(/[.\-\+\?\&\%\\\/]/g,"_");
  }
  if ((ftr == '') || (ftr == null) || (ftr == undefined)) ftr = GetWindowFeatures();
  var str='string'+document.location;
  if (str.indexOf('test/')==-1) {
	  win = window.open(wUrl, wName, ftr,0);
	  return win;
  } else {
	  location.href=wUrl;
  }
}

// �������� ����
function CloseWindow()
{
	if (zenPage.isPopup) {
		zenPage.firePopupAction('close','');
	} else {
		history.back();
	}
}

// +020704 logist - ������������ ���������� ����
function ReloadModalWindow()
{
  window.returnValue = "%reload%"
  window.close();
}

// �������� ���� � ������������� ����-�������� (������ ����������)
function CloseWindowReload()
{
  if (!window.opener.closed) { window.opener.location.reload() }
  window.close();
}

// �������� ���� � ��������� ����-��������
function CloseWindowOpener()
{
  if (window.opener != 'undefined') 
  {
    if (!window.opener.closed) { window.opener.close() }
  }
  window.close();
}


//***   Excel   ***********************************************

// ������� ������������ ����� � ��������
// shu 031214, 031229-orientation
// namberFormat - ������� � Excele ��� ������� ���� ������� �������� ������. 
// ����������� � ������� "B:B;D:E"
function PasteToExcel(str, lengthA, orientation,fontName,namberFormat,addExecute)
{
  try
  {
    if ((lengthA == undefined) || (lengthA == null) || (lengthA == '')) {
	    lengthA = 12;
    }
    if ((orientation == undefined) || (orientation == null) || (orientation == '')) {
	    orientation = 1;
    }

    if ((str != null) && (str != undefined) && (str != ""))
    {
      var bool = window.clipboardData.setData("Text", str);
      if (bool = false) { return; } //#
      var ExcelApp = new ActiveXObject("Excel.Application");
      var WorkBook = ExcelApp.WorkBooks.Add;
      ExcelApp.ActiveSheet.Paste;
      ExcelApp.Selection.VerticalAlignment = 1;
      ExcelApp.Selection.ColumnWidth = "50";
      ExcelApp.Selection.Interior.ColorIndex = 0;
      // ������� ������������� ��� ������
    	ExcelApp.Selection.Font.Underline = false;
      if (!((fontName == undefined) || (fontName == null) || (fontName == '')))
        ExcelApp.Selection.Font.Name = fontName;
      else {
	              ExcelApp.Selection.Font.Name = 'Courier New';
	      }  
	   // ������ �������� ������  � ������ ��������
	   if (!((namberFormat == undefined) || (namberFormat == null) || (namberFormat == ''))) { 
	    	for (j=1; j<=Length(namberFormat,";"); j++) {
           ExcelApp.ActiveSheet.Columns(Piece(namberFormat,";",j)).Select;
           ExcelApp.Selection.NumberFormat = "#,##0.00";
         }
	    
	   }
	  ExcelApp.Columns("A:A").Select;
      ExcelApp.Selection.ColumnWidth = lengthA;
      ExcelApp.Columns("B:Z").Select;
      ExcelApp.Selection.Rows.AutoFit;
      ExcelApp.Columns("B:Z").Select;
      ExcelApp.Selection.Columns.AutoFit;
      ExcelApp.ActiveSheet.PageSetup.Orientation = orientation;
      // ������������� ������ �������� 
      ExcelApp.ActiveSheet.PageSetup.LeftMargin = 25
      ExcelApp.ActiveSheet.PageSetup.RightMargin = 25
      ExcelApp.ActiveSheet.PageSetup.Zoom = false;
      ExcelApp.ActiveSheet.PageSetup.FitToPagesWide = 1;
      ExcelApp.ActiveSheet.PageSetup.FitToPagesTall = 999;
      if((addExecute != null) && (addExecute != undefined) && (addExecute != "")) {
	      eval(addExecute);
      }
      ExcelApp.ActiveSheet.Range("A1").Select;
      ExcelApp.ActiveSheet.Refresh;
      ExcelApp.Visible = true;
    }                            
  }
  catch(e) { alert(e.description); } 
}

// headCount - ���-�� ����� � ����� ������
// isReport- ���� true �� �����(1�� ������ ���� �����, 2�� ������ -�����(�� ��� ������)) 
// isReport- ���� �� ��� �� ��� ���...������ �� ������ ������
function Paste2Excel(str,columns,aligns,jsRefBook,isSimpleMode,isNumber,headCount,isReport)
{
  try
  {
    if ((str != null) && (str != undefined) && (str != ""))
    {
      var bool = window.clipboardData.setData("Text", str);
      if (bool)
      {
        var ExcelApp = new ActiveXObject("Excel.Application");
        var WorkBook = ExcelApp.WorkBooks.Add;
        WorkBook.WorkSheets(1).Activate;
        ExcelApp.ActiveSheet.Paste;

        if (isSimpleMode==true)
        {
          ExcelApp.Visible = true;
          return;          
        }

        // ������� ������������� ��� ������
    	ExcelApp.Selection.Font.Underline = false;
	    ExcelApp.Selection.Interior.ColorIndex = 0;
        ExcelApp.Selection.ColumnWidth = "50";
        if (isNumber==true) 
        {
	        //ExcelApp.Selection.NumberFormat = "@";
	        ExcelApp.Selection.VerticalAlignment = -4160;
        	ExcelApp.ActiveSheet.Columns("C:C").Select;
        	ExcelApp.Selection.NumberFormat = "#,##0.00";
        	ExcelApp.Selection.VerticalAlignment = -4107;
        }
        //ExcelApp.Selection.AutoFormat(); //�������� shu 040301
        ExcelApp.ActiveSheet.PageSetup.Orientation = 2;
        ExcelApp.ActiveSheet.PageSetup.Zoom = false;
        ExcelApp.ActiveSheet.PageSetup.FitToPagesWide = 1;
        ExcelApp.ActiveSheet.PageSetup.FitToPagesTall = 999;
        ExcelApp.Selection.VerticalAlignment = 1;

		  // ���������� ����� �������
        if ((jsRefBook != null) && (jsRefBook != undefined) && (jsRefBook != "")) {
          // ��������� �������
          if (jsRefBook.BottomRow!="") {
            columns = "";
            var j;
            for (j=1; j<=Length(jsRefBook.BottomRow,","); j++) {
              if (Piece(jsRefBook.BottomRow,",",j)=="*") {
                if (columns!="") columns = columns + ",";
                columns = columns + j;
              }
            }
          }
          //��������� �������� ������� �������
          if (jsRefBook.Cols!="") {
            aligns = "";
            var j,tempStr;
            for (j=1; j<=Length(jsRefBook.Cols,","); j++) {
              tempStr = Piece(jsRefBook.Cols,",",j);
              tempStr = Piece(tempStr,":",3);

              if (aligns!="") aligns = aligns + ",";
              if (tempStr=="") aligns = aligns + "left"
              else aligns = aligns + tempStr;
            }
          }
        }

        // ��������� ���������� � ��������
        if ((aligns != null) && (aligns != undefined) && (aligns != "")) {
          var j,tempStr;
          for (j=1; j<=Length(aligns,","); j++) {
            ExcelApp.ActiveSheet.Columns(GetCellsName(j)).Select;
            tempStr = Piece(aligns,",",j);
            if (tempStr=="") tempStr = 2;
            if (tempStr=="left") tempStr = 2;
            if (tempStr=="center") tempStr = 3;
            if (tempStr=="right") tempStr = 4;
            ExcelApp.Selection.HorizontalAlignment = tempStr;
          }
        }
        if (isNumber==false)
        {
        	if ((columns != null) && (columns != undefined) && (columns != "")) {
          	var j;
          	for (j=1; j<=Length(columns,","); j++) {
            	ExcelApp.ActiveSheet.Columns(GetCellsName(Piece(columns,",",j))).Select;
            	ExcelApp.Selection.NumberFormat = "@";//"#,##0.00";
          	}
        	}
        }
	      // ������������ ������� ������� � �����
	    ExcelApp.Columns("A:AZ").Select;
   	    ExcelApp.Selection.Rows.AutoFit;
      	ExcelApp.Columns("A:AZ").Select;
     	ExcelApp.Selection.Columns.AutoFit;
     	 	if (isNumber==true)
     	 	{
     	 		ExcelApp.ActiveSheet.Columns("A:A").Select;
     	 		ExcelApp.Selection.ColumnWidth = "15";
     	 		if ((headCount == null) || (headCount == undefined) || (headCount == "")) {
	     	 		headCount="1:1";
	     	 	}
     	 		ExcelApp.ActiveSheet.Rows(headCount).Select;
     	 		ExcelApp.Selection.HorizontalAlignment = -4131;
     	 	 	ExcelApp.Selection.WrapText = "False";
     	 	}
		  // ��������� ���������� � �����������
		
		var whereShapka="A1";
		if ((isReport != null) && (isReport != undefined) && (isReport != "")) {
			whereShapka="A2";
		}
        ExcelApp.ActiveSheet.Range(whereShapka).Select;
        
		if(ExcelApp.Selection.MergeCells>0)
		{
			ExcelApp.ActiveSheet.Range(whereShapka).Copy;
			WorkBook.WorkSheets(2).Activate;
			ExcelApp.ActiveSheet.Paste;
	      	ExcelApp.ActiveSheet.Range("A1").Select;
	      	ExcelApp.Selection.WrapText = 0;
	      	      	
	     	ExcelApp.Selection.Columns.AutoFit;
	     	var width=ExcelApp.Selection.ColumnWidth;
			ExcelApp.Selection.Clear;
			
			WorkBook.WorkSheets(1).Activate;
			ExcelApp.ActiveSheet.Range(whereShapka).MergeArea.Select;
			var colNum=ExcelApp.Selection.Columns.Count;
			var allWidth=0;
			
	//����������� ������ ��� ��� ������ ������
			var nonMergedCellRow=0;
			for(var i=1;i<=65536;i++)
			{
				var mergeInRow=0;
				for(var j=1;j<=colNum;j++)
				{
					ExcelApp.ActiveSheet.Cells(i,j).Select;
					if(ExcelApp.Selection.MergeCells>0)	
					{
						mergeInRow=1;
					}
				}
				if(mergeInRow==0)
				{
					nonMergedCellRow=i;
					break;
				}
			}
			for(var i=1;i<=colNum;i++)
			{
				ExcelApp.ActiveSheet.Cells(nonMergedCellRow,i).Select;
				allWidth=allWidth+ExcelApp.Selection.ColumnWidth;
			}
			for(var i=1;i<=colNum;i++)
			{
				ExcelApp.ActiveSheet.Cells(nonMergedCellRow,i).Select;
				var mplx=allWidth/ExcelApp.Selection.ColumnWidth;
				var newWidth=width/mplx;
				if(ExcelApp.Selection.ColumnWidth<newWidth)
					ExcelApp.Selection.ColumnWidth = newWidth;
			}
			ExcelApp.ActiveSheet.Range("A1").Select;
		}        
        
        ExcelApp.ActiveSheet.Refresh;
        ExcelApp.Visible = true;
      }
    }                            
  }
  catch(e) 
  {
        ExcelApp.Visible = true;
        alert(e.description);
  }
}

//
function ProcessTableForExcel(sourceTable,columns,jsRefBook)
{
  var i, j, row, rowIndex, fName,columns;

  if ((jsRefBook != null) && (jsRefBook != undefined))
  {
  columns = "";
   if (jsRefBook.BottomRow!="")
    {
      for (j=1; j<=Length(jsRefBook.BottomRow,","); j++)
      {
        if (Piece(jsRefBook.BottomRow,",",j)=="*")
        {
          if (columns!="") columns = columns + ",";
          columns = columns + j;
        }
      }
    }
  }

  for (i=1; i<sourceTable.rows.length; i++)
  {
    row = sourceTable.rows(i);
    for (j=1; j<=Length(columns,","); j++)
    {
      rowIndex = parseInt(Piece(columns,",",j),10)-1;
      row.cells(rowIndex).innerHTML = Replace(row.cells(rowIndex).innerHTML," ","");
    }
    if ((jsRefBook != null) && (jsRefBook != undefined) && (jsRefBook.ClassName=="fin.Operation"))
    {
      for (j=1; j<=Length(jsRefBook.Select,","); j++)
      {
        fName = Piece(jsRefBook.Select,",",j);
        if ((fName=="DebitAccount->Aka") || (fName=="CreditAccount->Aka") || (fName=="DebitAccount.Aka") || (fName=="CreditAccount.Aka"))
        {
          rowIndex = j-1;
          row.cells(rowIndex).innerHTML = "&nbsp;" + row.cells(rowIndex).innerHTML;
        }
      }
    }
  }
}

function GetCellsName(number)
{
  if (number==1) return "A:A";
  if (number==2) return "B:B";
  if (number==3) return "C:C";
  if (number==4) return "D:D";
  if (number==5) return "E:E";
  if (number==6) return "F:F";
  if (number==7) return "G:G";
  if (number==8) return "H:H";
  if (number==9) return "I:I";
  if (number==10) return "J:J";
  if (number==11) return "K:K";
  if (number==12) return "L:L";
  if (number==13) return "M:M";
  if (number==14) return "N:N";
  if (number==15) return "O:O";
  if (number==16) return "P:P";
  if (number==17) return "Q:Q";
  if (number==18) return "R:R";
  if (number==19) return "S:S";
  if (number==20) return "T:T";
  if (number==21) return "U:U";
  if (number==22) return "V:V";
  if (number==23) return "W:W";
  if (number==24) return "X:X";
  if (number==25) return "Y:Y";
  if (number==26) return "Z:Z";
  if (number==27) return "AA:AA";
  if (number==28) return "AB:AB";
  if (number==29) return "AC:AC";
  if (number==30) return "AD:AD";
  if (number==31) return "AE:AE";
  if (number==32) return "AF:AF";
  if (number==33) return "AG:AG";
  if (number==34) return "AH:AH";
  if (number==35) return "AI:AI";
  if (number==36) return "AJ:AJ";
  if (number==37) return "AK:AK";
  if (number==38) return "AL:AL";
  if (number==39) return "AM:AM";
  if (number==40) return "AN:AN";
  if (number==41) return "AO:AO";
  if (number==42) return "AP:AP";
  if (number==43) return "AQ:AQ";
  if (number==44) return "AR:AR";
  if (number==45) return "AS:AS";
  if (number==46) return "AT:AT";
  if (number==47) return "AU:AU";
  if (number==48) return "AV:AV";
  if (number==49) return "AW:AW";
  if (number==50) return "AX:AX";
  if (number==51) return "AY:AY";
  if (number==52) return "AZ:AZ";
}


//***   String   ***********************************************************

// � ������ str �������� ��� ��������� s1 �� s2
function Replace(str, s1, s2)
{
  var res = new String(str);
  var key;

  key = res.indexOf(s1);
  while (key != -1)
  {
    res = res.substr(0, key) + s2 + res.substr(key+s1.length, res.length-s1.length);
    key = res.indexOf(s1,key+s2.length);
  }
  return res;
}

// ������ $Length(str, [delimiter])
function Length(str, delimiter)
{
  if ((!delimiter)||(str.length==0)) return str.length;
  var result = 1;
  var key = str.indexOf(delimiter);
  while (key != -1)
  {
    result++;
    str = str.substring(key + delimiter.length, str.length);
    key = str.indexOf(delimiter);
  }
  return result;
}

// ������ $Piece(str, delimiter, index)
function Piece(str, delimiter, index)
{
  if ((Length(str, delimiter) < index) || (index < 1)) return "";
  var result = "", i = 1;
  var key = str.indexOf(delimiter);
  while (key != -1)
  {
    if (i == index) return str.substring(0, key);
    str = str.substring(key + delimiter.length, str.length);
    key = str.indexOf(delimiter);
    i++;
  }
  if (i == index) return str;
  return result;
}

function PieceFind(str, substr, delimeter)
{
  for (var i=1; i<=Length(str,delimeter); i++)
  {
    if (Piece(str,delimeter,i)==substr) return i;
  }
  return 0;
}

function IsPieceFind(str, substr, delimeter)
{
  for (var i=1; i<=Length(str,delimeter); i++)
  {
    if (Piece(str,delimeter,i)==substr) return true;
  }
  return false;
}
// ��������� ������ �� ������� dd.mm.yy � 'mm/dd/yy'
function DateDisplayTypesConvert(dateStr)
{
	var pos1= dateStr.indexOf(".");
	var pos2= dateStr.lastIndexOf(".");
	return '\''+dateStr.substring(pos1+1,pos2)+"/"+dateStr.substring(0, pos1)+"/"+dateStr.substring(pos2+1,dateStr.length)+'\''
}

//***   ������ �������   **********************************************

// ��������� �������� �������� �� �������
function TranslateControlValue(controlName)
{
  var status = true, errorMessage = "";
  if (controlName==undefined) return true;
  try
  {
    var element = null, cdt = "", cvalue = "";
    eval("element = "+controlName+";");
    if ((element==null) || (element==undefined)) return true;

    cdt = element.p6DataType;
    cvalue = element.value;
    if ((cdt==undefined) || (cvalue==undefined) || (cvalue=="")) return true;

    if ((cdt=="currency") || (cdt=="Currency") || (cdt=="CURRENCY"))
    {
      cvalue = Replace(cvalue,',','.');
      element.value = cvalue;
      if (isNaN(cvalue) || (cvalue.toLowerCase().indexOf("x")!=-1))
      {
        status = false;
        errorMessage = "�������� ��������: '"+cvalue+"'. �������� ������ ���� ��������.";
      }
    }
    if ((cdt=="float") || (cdt=="Float") || (cdt=="FLOAT"))
    {
      cvalue = Replace(cvalue,',','.');
      element.value = cvalue;
      if (isNaN(cvalue) || (cvalue.toLowerCase().indexOf("x")!=-1))
      {
        status = false;
        errorMessage = "�������� ��������: '"+cvalue+"'. �������� ������ ���� ��������.";
      }
    }
    if ((cdt=="integer") || (cdt=="Integer") || (cdt=="INTEGER"))
    {
      if (isNaN(cvalue) || (parseInt(cvalue,10)!=cvalue))
      {
        status = false;
        errorMessage = "�������� ��������: '"+cvalue+"'. �������� ������ ���� ����� ������.";
      }
    }
  }
  catch(e) { }

  if (!status)
  {
    //alert(errorMessage+"   ����� ���� ��� �� ������� �� ������ OK, �����, � ���������, �������� �� ��������� �������. � �� �������� ��������, ������� �� ����� ����� �������� �� ������ �������� ����� �� ��������.");
    alert(errorMessage);
    element.focus();
    element.refresh();
    event.cancelBubble = true;
    event.returnValue = false;
  }

  return status;
}

// ��������� readOnly (disabled) � ���� ���������, ����� exceptList
function SetReadOnly2AllControls(exceptList)
{
  if ((exceptList==null) || (exceptList==undefined)) exceptList = "";
  var element = null;
  for (var i=0; i<window.document.all.length; i++)
  {
    element = window.document.all.item(i);
    if ((element != null) && ((element.tagName=="INPUT") || (element.tagName=="BUTTON") || (element.tagName=="TEXTAREA") || (element.tagName=="SELECT")))
    {
      if ((element.id=="") || !IsPieceFind(exceptList,element.id,","))
      {
        element.readOnly = true;
        if ((element.tagName=="SELECT") ||(element.tagName=="BUTTON") || ((element.tagName=="INPUT") && ((element.type=="button") || (element.type=="checkbox")))) element.disabled = true;
      }
    }
  }
}

// ����� � ���� ��������� ������ refresh()
function RefreshAllControls()
{
  var element;
  for (var i=0; i<window.document.all.length; i++)
  {
    element = window.document.all.item(i);
    if ((element != null) && ((element.tagName=="INPUT") || (element.tagName=="TEXTAREA") || (element.tagName=="SELECT")))
    {
      try { element.refresh(); }
      catch(e) {  }
    }
  }
}

// ��������� ������ �� ������ ������� � ������
function SetFocusOnFirstControl()
{
  var bFound = false;

  // for each form
  for (f=0; f < document.forms.length; f++)
  {
    // for each element in each form
    for(i=0; i < document.forms[f].length; i++)
    {
      // if it's not a hidden element
      if (document.forms[f][i].type != "hidden")
      {
        // and it's not disabled
        if (document.forms[f][i].disabled != true)
        {
            // set the focus to it
            document.forms[f][i].focus();
            var bFound = true;
        }
      }
      // if found in this element, stop looking
      if (bFound == true)
        break;
    }
    // if found in this form, stop looking
    if (bFound == true)
      break;
  }
}

// ��������� ��� ������������� � elems ��������� ��������  readonly
function ReadOnly(elems)
{      
  var focusElemIndex, focusElemName, elem;
  var elemsLength = Length(elems,",");
  var nwhile = 0;
  while (nwhile != elemsLength)
  {
    nwhile = nwhile + 1;
    elem = Piece(elems,",",nwhile);
    document.all[elem].readOnly = true ;
  }
}
