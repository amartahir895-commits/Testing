const axios = require('axios');
const cheerio = require('cheerio');

class PakistanSimScraper {
  constructor() {
    this.baseURL = process.env.TARGET_BASE;
    this.apiPath = process.env.TARGET_PATH;
    this.timeout = 30000;
  }

  async search(query) {
    try {
      if (!this.baseURL || !this.apiPath) {
        throw new Error('Server configuration missing');
      }

      const url = `${this.baseURL}${this.apiPath}`;
      
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': this.baseURL,
        'Referer': `${this.baseURL}/`,
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin'
      };

      const data = new URLSearchParams();
      data.append('search_query', query);

      console.log(`Searching for: ${query}`);
      
      const response = await axios.post(url, data, {
        headers: headers,
        timeout: this.timeout,
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      });

      if (response.status !== 200) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return this.parseHTML(response.data);
      
    } catch (error) {
      console.error('Scraper error:', error.message);
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  parseHTML(html) {
    try {
      const $ = cheerio.load(html);
      const results = [];

      // Look for tables that might contain the data
      $('table').each((tableIndex, table) => {
        const $table = $(table);
        
        // Skip tables with very few rows (likely not data tables)
        if ($table.find('tr').length < 2) return;

        $table.find('tr').each((rowIndex, row) => {
          // Skip header row
          if (rowIndex === 0) return;

          const $cells = $(row).find('td, th');
          
          if ($cells.length >= 4) {
            const result = {
              mobile: $cells.eq(0).text().trim(),
              name: $cells.eq(1).text().trim(),
              cnic: $cells.eq(2).text().trim(),
              address: $cells.eq(3).text().trim(),
              table_index: tableIndex,
              row_index: rowIndex
            };

            // Only add if we have meaningful data
            if (result.mobile || result.name || result.cnic) {
              results.push(result);
            }
          }
        });
      });

      // If no tables found, try to find any structured data
      if (results.length === 0) {
        $('div, p, span').each((index, element) => {
          const text = $(element).text().trim();
          if (text.includes(query) || text.includes('92') || text.includes('CNIC')) {
            results.push({
              raw_data: text,
              element: element.name
            });
          }
        });
      }

      return results;
      
    } catch (error) {
      console.error('Parse error:', error);
      throw new Error('Failed to parse response data');
    }
  }
}

module.exports = PakistanSimScraper;
