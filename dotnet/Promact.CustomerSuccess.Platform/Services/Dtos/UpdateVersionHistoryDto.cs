﻿using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateVersionHistoryDto
    {
        public required int Version { get; set; }
        public required string Type { get; set; }
        public required string Change { get; set; }
        public required string ChangeReason { get; set; }
        public required string CreatedBy { get; set; }
        public required string RevisionDate { get; set; }
        public required string ApprovalDate { get; set; }
        public required string ApprovedBy { get; set; }
    }
}