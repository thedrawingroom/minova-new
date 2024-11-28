<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\GlobalSet;
use Statamic\Facades\Site;
use League\Csv\Reader;

class ImportCountries extends Command
{
    protected $signature = 'statamic:import-countries {csv}';
    protected $description = 'Import countries from a CSV file into a Statamic global set for all sites';

    public function handle()
    {
        $csvPath = $this->argument('csv');

        if (!file_exists($csvPath)) {
            $this->error("CSV file not found: $csvPath");
            return 1;
        }

        $csv = Reader::createFromPath($csvPath, 'r');
        $csv->setHeaderOffset(0);

        $headers = $csv->getHeader();
        if (!in_array('country_name', $headers) || !in_array('country_code', $headers)) {
            $this->error('The CSV file must include "country_name" and "country_code" headers.');
            return 1;
        }

        $records = $csv->getRecords();

        $countries = [];
        foreach ($records as $record) {
            $countries[] = [
                'country_name' => $record['country_name'],
                'country_code' => $record['country_code'],
            ];
        }

        $globalSet = GlobalSet::findByHandle('country_list');

        if (!$globalSet) {
            $this->error("Global set not found!");
            return 1;
        }

        foreach (Site::all() as $site) {
            $siteHandle = $site->handle();

            $localizedGlobal = $globalSet->in($siteHandle);

            if (!$localizedGlobal) {
                $this->error("Global set not found for site: $siteHandle");
                continue;
            }

            $localizedGlobal->set('countries', $countries);
            $localizedGlobal->save();

            $this->info("Countries successfully imported for site: $siteHandle");
        }

        $this->info("Countries successfully imported into the global set for all sites!");
        return 0;
    }
}
