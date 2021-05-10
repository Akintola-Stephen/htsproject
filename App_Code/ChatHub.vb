Imports Microsoft.VisualBasic
Imports Microsoft.AspNet.SignalR
Imports Newtonsoft.Json
Imports Newtonsoft.Json.Linq
Imports System.Web.Script.Serialization
Imports System.Data
Imports System.IO
Imports System.Data.SqlClient
Imports System.Globalization
Imports System.Drawing

    Public Class ChatHub
        Inherits Hub
        Dim DAL As New DAL

        Public Function interns_Insert(
            ByVal JSON_STRING As String,
            ByVal ACTION_TYPE As String  
            ) As String
            
            Dim status As String = "ERROR"
            Dim dc_return As New Dictionary(Of String, Object)
            
            Try
                Dim ds As DataSet = DAL.internsInsert_SignalR(JSON_STRING, ACTION_TYPE)
                Dim dt As DataTable = ds.Tables(0)
                dc_return.Add("RESULT", dt)
                dc_return.Add("ACTION_TYPE", ACTION_TYPE)
                status = "SUCCESS"
                
            Catch ex As Exception
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            End Try

            dc_return.Add("STATUS", status)
             Clients.All.broadcastrecords(JsonConvert.SerializeObject(dc_return))
            Return JsonConvert.SerializeObject(dc_return)
        End Function


        Public Function category_signalR_chatHub(
            ByVal JSON_STRING As String,
            ByVal ACTION_TYPE As String  
            ) As String
            
            Dim status As String = "ERROR"
            Dim dc_return2 As New Dictionary(Of String, Object)
            
            Try
                Dim ds As DataSet = DAL.category_SignalR(JSON_STRING, ACTION_TYPE)
                Dim dt As DataTable = ds.Tables(0)
                dc_return2.Add("RESULT", dt)
                dc_return2.Add("ACTION_TYPE", ACTION_TYPE)
                status = "SUCCESS"
                
            Catch ex As Exception
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            End Try

            dc_return2.Add("STATUS", status)
             Clients.All.broadcastrecords(JsonConvert.SerializeObject(dc_return2))
            Return JsonConvert.SerializeObject(dc_return2)
        End Function


        Public Function login_authentication(
            ByVal email As String,
            ByVal password As String  
            ) As String
            
            Dim status As String = "ERROR"
            Dim dc_return As New Dictionary(Of String, Object)
            
            Try
                Dim ds As DataSet = DAL.login_authenticate_SignalR(email, password)
                Dim dt As DataTable = ds.Tables(0)
                Dim dt2 As DataTable = ds.Tables(1)
                dc_return.Add("RESULT", dt)
                dc_return.Add("OUTPUT", dt2)
                status = "SUCCESS"
                
            Catch ex As Exception
                BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            End Try

            dc_return.Add("STATUS", status)
             Clients.All.broadcastrecords(JsonConvert.SerializeObject(dc_return))
            Return JsonConvert.SerializeObject(dc_return)
        End Function



  


    End Class



