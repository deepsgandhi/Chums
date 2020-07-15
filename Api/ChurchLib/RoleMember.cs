﻿using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChurchLib
{
    public partial class RoleMember
    {
        public DateTime PhotoUpdated { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string RoleName { get; set; }

        public static RoleMember GetExtended(DataRow row)
        {
            RoleMember rm = new RoleMember(row);
            if (row.Table.Columns.Contains("PhotoUpdated")) rm.PhotoUpdated = (Convert.IsDBNull(row["PhotoUpdated"])) ? DateTime.MinValue : Convert.ToDateTime(row["PhotoUpdated"]);
            if (row.Table.Columns.Contains("Email")) rm.Email = (Convert.IsDBNull(row["Email"])) ? "" : Convert.ToString(row["Email"]);
            if (row.Table.Columns.Contains("FirstName") && row.Table.Columns.Contains("LastName") && row.Table.Columns.Contains("NickName")) rm.DisplayName = Person.GetDisplayName(Convert.ToString(row["FirstName"]), Convert.ToString(row["LastName"]), Convert.ToString(row["NickName"]));
            if (row.Table.Columns.Contains("RoleName")) rm.RoleName = (Convert.IsDBNull(row["RoleName"])) ? "" : Convert.ToString(row["RoleName"]);
            return rm;
        }

    }
}