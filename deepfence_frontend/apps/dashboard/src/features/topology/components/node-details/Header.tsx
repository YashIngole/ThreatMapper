import { FaPlay } from 'react-icons/fa';
import { HiArrowLeft } from 'react-icons/hi';
import {
  Button,
  Dropdown,
  DropdownItem,
  IconButton,
  SlidingModalHeader,
} from 'ui-components';

import { MalwareScanActionEnumType } from '@/components/scan-configure-forms/MalwareScanConfigureForm';
import { SecretScanActionEnumType } from '@/components/scan-configure-forms/SecretScanConfigureForm';
import { VulnerabilityScanActionEnumType } from '@/components/scan-configure-forms/VulnerabilityScanConfigureForm';
import { MalwareIcon } from '@/components/sideNavigation/icons/Malware';
import { PostureIcon } from '@/components/sideNavigation/icons/Posture';
import { SecretsIcon } from '@/components/sideNavigation/icons/Secrets';
import { VulnerabilityIcon } from '@/components/sideNavigation/icons/Vulnerability';
import { TruncatedText } from '@/components/TruncatedText';
import { ConfigureScanModalProps } from '@/features/registries/components/ConfigureScanModal';
import { getNodeImage } from '@/features/topology/utils/graph-styles';

const AvailableScansForNodeType: Record<string, string[]> = {
  host: ['vulnerability', 'secret', 'malware', 'compliance'],
  container: ['vulnerability', 'secret', 'malware'],
  container_image: ['vulnerability', 'secret', 'malware'],
};

export const Header = ({
  nodeId,
  nodeType,
  onGoBack,
  showBackBtn,
  onStartScanClick,
}: {
  nodeId: string;
  nodeType: string;
  onGoBack: () => void;
  showBackBtn: boolean;
  onStartScanClick: (scanOptions: ConfigureScanModalProps['scanOptions']) => void;
}) => {
  const availableScans = AvailableScansForNodeType[nodeType] ?? [];
  return (
    <SlidingModalHeader>
      <div className="flex items-center justify-between pr-8">
        <div className="flex gap-2 items-center flex-1 max-w-full">
          {showBackBtn && (
            <div>
              <IconButton onClick={onGoBack} size="xs" icon={<HiArrowLeft />} />
            </div>
          )}
          <div className="w-6 h-6">
            <img src={getNodeImage(nodeType)} alt={nodeType} width="100%" height="100%" />
          </div>
          <div className="truncate flex-1">
            <TruncatedText text={nodeId} />
          </div>
          {availableScans.length ? (
            <Dropdown
              align="end"
              content={
                <>
                  {availableScans.includes('vulnerability') ? (
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault();
                        onStartScanClick({
                          nodeIds: [nodeId],
                          nodeType: nodeType as any,
                          scanType: VulnerabilityScanActionEnumType.SCAN_VULNERABILITY,
                          showAdvancedOptions: false,
                        });
                      }}
                    >
                      <span className="h-6 w-6">
                        <VulnerabilityIcon />
                      </span>
                      <span>Start Vulnerability Scan</span>
                    </DropdownItem>
                  ) : null}
                  {availableScans.includes('secret') ? (
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault();
                        onStartScanClick({
                          nodeIds: [nodeId],
                          nodeType: nodeType as any,
                          scanType: SecretScanActionEnumType.SCAN_SECRET,
                          showAdvancedOptions: false,
                        });
                      }}
                    >
                      <span className="h-6 w-6">
                        <SecretsIcon />
                      </span>
                      <span>Start Secret Scan</span>
                    </DropdownItem>
                  ) : null}
                  {availableScans.includes('malware') ? (
                    <DropdownItem
                      onClick={(e) => {
                        e.preventDefault();
                        onStartScanClick({
                          nodeIds: [nodeId],
                          nodeType: nodeType as any,
                          scanType: MalwareScanActionEnumType.SCAN_MALWARE,
                          showAdvancedOptions: false,
                        });
                      }}
                    >
                      <span className="h-6 w-6">
                        <MalwareIcon />
                      </span>
                      <span>Start Malware Scan</span>
                    </DropdownItem>
                  ) : null}
                  {availableScans.includes('compliance') ? (
                    <DropdownItem>
                      <span className="h-6 w-6">
                        <PostureIcon />
                      </span>
                      <span>Start Compliance Scan</span>
                    </DropdownItem>
                  ) : null}
                </>
              }
            >
              <Button
                color="primary"
                size="xs"
                startIcon={<FaPlay />}
                className="self-end"
              >
                Scan
              </Button>
            </Dropdown>
          ) : null}
        </div>
      </div>
    </SlidingModalHeader>
  );
};
