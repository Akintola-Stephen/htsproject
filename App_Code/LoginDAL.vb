Imports Microsoft.VisualBasic
Imports Microsoft.ApplicationBlocks.Data
Imports System.Data.SqlClient
Imports System.Data

Public Class LoginDAL
    Dim conn As SqlConnection
    Dim Context As HttpContext = HttpContext.Current
    Public Sub New()
        conn = New SqlConnection(ConnectionString.ConnectionString)

    End Sub

    Public Function login_SignalR(
        ByVal username As String,
        ByVal password As String 
        ) As DataSet
       
        Try
            Dim params() As SqlParameter = {New SqlParameter("@username", username),
                                            New SqlParameter("@password", password)
                                            }
                                            
            'ADMIN_USER_MODULE_OPERATION is used to specify the name of the stored procedure'
            Return SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, "Validate_User_login", params)
        Catch ex As Exception
            BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            Return Nothing
        Finally
            conn.Close()
        End Try
    End Function


     Public Function internsUpdate_SignalR(
        ByVal JSON_STRING As String,
        ByVal ACTION_TYPE As String 
        ) As DataSet
       
        Try
            Dim params() As SqlParameter = {New SqlParameter("@JSON_STRING", JSON_STRING),
                                            New SqlParameter("@ACTION_TYPE", ACTION_TYPE)
                                            }
                                            
            'ADMIN_USER_MODULE_OPERATION is used to specify the name of the stored procedure
            Return SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, "ADMIN_ASIGN_TO_USER_OPERATION", params)
        Catch ex As Exception
            BLL.WriteLog(ex.Message + " : " + ex.StackTrace)
            Return Nothing
        Finally
            conn.Close()
        End Try
    End Function


   

    
  
End Class
